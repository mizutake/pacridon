const UserSession = require('../models/user_session');
const User = require('../models/user');

module.exports = function(app) {
  app.use(function (req, res, next) {
    let sessionId = req.sigendCookies.session_id;

    if(sessionId === null || sessionId === undefined) {
      return next();
    }

    UserSession.find(sessionId).then((session) => {
      return UserSession.find(session.data.user_id);
    }).then((user) => {
      res.local.currentUser = user;
      next();
    }).catch((err) => {
      console.error(err);
      next();
    })
  });
}