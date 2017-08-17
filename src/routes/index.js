const Toot = require('../models/toot');
const User = require('../models/user');
const UserSession = require('../models/user_session');



module.exports = function(app) {

  app.get("/", function(req, res) {
    if(!req.signedCookies.session_id) {
      rea.redirect('./login');
      return;
    }
    UserSession.find(req.signedCookies.session_id).then((session) => {
      return User.find(session.data.user_id);
    }).then((user) => {
      return user.toots();
    }).then((toots) => {
      res.render('timeline', { toots: toots });
    }).catch((err) => {
      console.log(err);
      res.render('timeline', { error: true });
    });
  });

  app.post('/new_toot', function(req, res) {
    UserSession.find(req.signedCookies.session_id).then((session) => {
      return User.find(session.data.user_id);
    }).then((user) => {
      return Toot.create(user, req.body.toot);
    }).then(() => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err);
      res.redirect('/');
    });
  });

  require('./users')(app);
};

