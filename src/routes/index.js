module.exports = function(app) {
  app.get("/", function(req, res) {
    res.send("Initialized:" + req.signedCookies.session_id);
  });

  require('./users')(app);
};

