module.exports = function(app) {
  app.get("/", function(req, res) {
    res.send("Initialized" + req.cookies.userID);
  });

  require('./users')(app);
};

