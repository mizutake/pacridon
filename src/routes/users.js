const crypto = require('crypto');
const User = require('../models/user');
module.exports = function (app) {
  app.get('/signup', function (req, res) {
    res.render('signup');
  });

  app.post("/signup", function (req, res) {
    let email = req.body.email;
    let nickname = req.body.nickname;
    let password = req.body.password;
    let salt = crypto.randomBytes(8).toString('hex');
    let sha512 = crypto.createHash('sha512');
    sha512.update(salt);
    sha512.update(password);
    let hash = sha512.digest('hex');

    let user = new User({
      nickname: nickname,
      email: email,
      password: hash,
      salt: salt
    });
    user.save().then(() => {
      res.redirect(302, '/login');
    }, error => {
      console.error(error);
      res.status(409).send('Nickname または E-mailアドレスが重複しています')
    })
  });

  app.get('/login', function (req, res) {
    res.render('login');
  });

  app.post('/login', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;

    User.collection().where({ email: email }).then((users) => {
      if (users.length < 1) {
        throw new Error("User not found");
      }
      let user = users[0];
      let salt = user.data.salt;
      let sha512 = crypto.createHash('sha512');
      sha512.update(salt);
      sha512.update(password);
      let hash = sha512.digest('hex');

      if (hash !== user.data.password) {
        throw new Error("Password is not match");
      }

      res.redirect("/");
    }).catch((err) => {
      res.render("login", { error: true });
    })
  });
}