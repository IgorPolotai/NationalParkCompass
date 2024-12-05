const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getMap', mid.requiresLogin, controllers.Map.getMap);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/about', mid.requiresLogin, controllers.Account.aboutPage);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  
  app.get('/map', mid.requiresLogin, controllers.Map.mapPage);
  app.post('/maker', mid.requiresLogin, controllers.Map.makeDomo);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
