const Toot = require('../models/toot');
const User = require('../models/user');
const UserSession = require('../models/user_session');



module.exports = function(app) {

  app.get("/", function(req, res) {
    if(!res.locale.currentUser) {
      rea.redirect('./login');
      return;
    }
    res.locale.currentUser.toots().then((toots) => {
      res.render('timeline', { toots: toots });
    }).catch((err) => {
      console.log(err);
      res.render('timeline', { error: true });
    });
  });

  app.post('/new_toot', function(req, res) {
   if(!res.locale.currentUser) {
     res.redirect("/login");
    return
   }

   Toot.create(res.locale.currentUser, req.body.toot).then(()=> {
     res.redirect('/');
   }).catch((err) => {
     console.log(err);
     res.redirect('/');
   })
  });

  require('./users')(app);
};

