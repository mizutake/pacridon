const Toot = require('../../models/toot')

module.exports = function(app) {
  app.get('/api/toots', function(req, res) {
    if(!res.locals.currentUser) {
      res.status(401).json({ "error": "Unauthorized" });
      return;
    }

    res.locals.currentUser.toots().then((toots) => {
      res.json(toots.map((toot) => {
        return toot.data;
      }));
    }).catch((error)=> {
      res.status(500).json({ error: error.toString() });
    })
  });

  app.post('/api/toots', function(req, res) {
      if(!res.locals.currentUser) {
        res.status(401).json({ "error": "Unauthorized" });
        return;
      }
      Toot.create(res.locals.currentUser, req.body.toot).then((toot)=> {
        res.json({ toot: toot.data });
    }).catch((err) => {
      res.status(500).json({ error: error.toString() })
    });
  });
};