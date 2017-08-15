const crypto = require('crypto');
const User = require('../models/user');
module.exports = function (app) {
  app.get('/signup', function (req, res) {
    res.render('signup');
  });

  app.post("/signup", function (req, res) {
    let email = req.body.email;
    let pass = req.body.password;
    let nickname = req.body.nickname;

    let salt = crypto.randomBytes(8).toString('hex');
    let sha512 = crypto.createHash('sha512');
    sha512.update(salt);
    sha512.update(pass);
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
}