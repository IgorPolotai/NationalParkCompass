const models = require('../models');

const geojson = require('./parks.json');

const { features } = geojson;
const parkNames = features.map((feature) => feature.properties.title);

const { Account, ParkTrip } = models;

const loginPage = (req, res) => res.render('login');

const aboutPage = (req, res) => res.render('about');

// const signupPage = (req, res) => res.render('signup');

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/map' });
  });
};

const changePassword = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const newPass = `${req.body.newPass}`;

  if (!username || !pass || !newPass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, async (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    try {
      // Hash the new password first, before passing it to the update
      const hashedNewPass = await Account.generateHash(newPass);

      // Update the password in the database
      const updatedAccount = await Account.findOneAndUpdate(
        { username },
        { password: hashedNewPass }, // Ensure hashed password is passed here
        { new: true }, // This ensures we get the updated document back
      );

      // Check if the update was successful
      if (!updatedAccount) {
        return res.status(400).json({ error: 'Password update failed!' });
      }

      // Update session with the new account information
      req.session.account = Account.toAPI(updatedAccount);

      return res.json({ redirect: '/map' });
    } catch (updateErr) {
      console.error('Error during password update:', updateErr);
      return res.status(500).json({ error: 'An error occurred while updating password!' });
    }
  });
};

const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);

    // Now we generate a ParkTrip for each national park
    // So that all we have to do is update them
    // eslint-disable-next-line no-restricted-syntax
    // console.log(`Park Trip: ${parkNames}`);

    for (let i = 0; i < parkNames.length; i++) {
      const parkName = parkNames[i];

      // Ensure the parkName is valid
      if (!parkName || typeof parkName !== 'string' || parkName.trim() === '') {
        console.error(`Invalid park name at index ${i}:`, parkName);
        return res.status(400).json({ error: `Invalid park name at index ${i}.` });
      }

      const parkTripData = {
        parkName,
        tripDiary: {
          diaryEntries: [],
        },
        owner: req.session.account._id,
      };

      try {
        const newParkTrip = new ParkTrip(parkTripData);
        await newParkTrip.save();
      } catch (err) {
        console.error('Error creating park trip:', err);
        return res.status(400).json({ error: 'An error occurred creating parks for this account!' });
      }
    }

    return res.json({ redirect: '/map' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use!' });
    }
    return res.status(500).json({ error: 'An error occured!' });
  }
};

module.exports = {
  loginPage,
  aboutPage,
  changePassword,
  login,
  logout,
  signup,
};
