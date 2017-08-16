module.exports = function(app) {
  app.get("/", function(req, res) {
    console.log(req.cookies.session_id);
    console.log(req.signedCookies.session_id);
    res.send("Initialized:" + req.signedCookies.userID);
  });

  require('./users')(app);
};

