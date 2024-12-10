/* eslint-disable linebreak-style */
/* eslint-disable parsing-error */
const React = require('react');
const { createRoot } = require('react-dom/client');
const helper = require('./helper.js');

const handleLogin = (e) => {
  e.preventDefault();
  helper.hideError();

  const username = e.target.querySelector('#user').value;
  const pass = e.target.querySelector('#pass').value;

  if (!username || !pass) {
    helper.handleError('Username or password is empty!');
    return false;
  }

  helper.sendPost(e.target.action, { username, pass });
  return false;
};

const handleSignup = (e) => {
  e.preventDefault();
  helper.hideError();

  const username = e.target.querySelector('#user').value;
  const pass = e.target.querySelector('#pass').value;
  const pass2 = e.target.querySelector('#pass2').value;

  if (!username || !pass || !pass2) {
    helper.handleError('All fields are required!');
    return false;
  }

  if (pass !== pass2) {
    helper.handleError('Passwords do not match!');
    return false;
  }

  helper.sendPost(e.target.action, { username, pass, pass2 });
  return false;
};

const handleChangePassword = (e) => {
  e.preventDefault();
  helper.hideError();

  const username = e.target.querySelector('#changeUser').value;
  const pass = e.target.querySelector('#changePass').value;
  const newPass = e.target.querySelector('#changeNewPass').value;

  if (!username || !pass || !newPass) {
    helper.handleError('All fields are required!');
    return false;
  }

  helper.sendPost(e.target.action, { username, pass, newPass });
  return false;
};

const LoginWindow = (props) => {
    return (
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm">
                <label htmlFor="username">Username: </label>
                <input class="loginInput" id="user" type="text" name="username" placeholder="username" />
                <br />
                <label htmlFor="pass">Password: </label>
                <input class="loginInput" id="pass" type="password" name="pass" placeholder="password" />
                <br />
                <input className="formSubmit" type="submit" value="Sign in" />
        </form>
    );
};

const SignupWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm">
                <label htmlFor="username">Username: </label>
                <input class="loginInput" id="user" type="text" name="username" placeholder="username" />
                <br />
                <label htmlFor="pass">Password: </label>
                <input class="loginInput" id="pass" type="password" name="pass" placeholder="password" />
                <br />
                <label htmlFor="pass">Password: </label>
                <input id="pass2" type="password" name="pass2" placeholder="retype password" />
                <br />
                <input className="formSubmit" type="submit" value="Sign up" />
        </form>
    );
};

const ChangePasswordWindow = (props) => {
  return (
      <form id="changePasswordForm"
          name="changePasswordForm"
          onSubmit={handleChangePassword}
          action="/changePassword"
          method="POST"
          className="mainForm">
              <label htmlFor="username">Username: </label>
              <input class="loginInput" id="changeUser" type="text" name="username" placeholder="username" />
              <br />
              <label htmlFor="pass">Old Password: </label>
              <input class="loginInput" id="changePass" type="password" name="pass" placeholder="type old password" />
              <br />
              <label htmlFor="pass">New Password: </label>
              <input class="loginInput" id="changeNewPass" type="password" name="newPassword" placeholder="type new password" />
              <br />
              <input className="formSubmit" type="submit" value="Change Password" />
      </form>
  );
};

const init = () => {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    const root = createRoot(document.getElementById('content'));

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render(<LoginWindow />);
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render(<SignupWindow />);
        return false;
    });

    changePasswordButton.addEventListener('click', (e) => {
      e.preventDefault();
      root.render(<ChangePasswordWindow />);
      return false;
    });

    root.render(<SignupWindow />);
};

window.onload = init;