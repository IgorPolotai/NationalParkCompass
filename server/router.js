const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.post('/makeDigitalStamp', mid.requiresLogin, controllers.Map.makeDigitalStamp);
  app.get('/getDigitalStamp', mid.requiresLogin, controllers.Map.getDigitalStamp);

  app.post('/makeFavorites', mid.requiresLogin, controllers.Map.makeFavorites);
  app.delete('/deleteFavorites', mid.requiresLogin, controllers.Map.deleteFavorites);
  app.get('/getFavorites', mid.requiresLogin, controllers.Map.getFavorites);

  app.post('/makePhotoGallery', mid.requiresLogin, controllers.Map.makePhotoGallery);
  app.get('/getPhotoGallery', mid.requiresLogin, controllers.Map.getPhotoGallery);

  app.post('/makeTripDiary', mid.requiresLogin, controllers.Map.makeTripDiary);
  app.get('/getTripDiary', mid.requiresLogin, controllers.Map.getTripDiary);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/about', mid.requiresLogin, controllers.Account.aboutPage);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/changePassword', mid.requiresSecure, mid.requiresLogout, controllers.Account.changePassword);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/map', mid.requiresLogin, controllers.Map.mapPage);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('*', (req, res) => res.redirect('/'));
};

module.exports = router;
