const UserFollowing = require('../../models/user_following');


module.exports = function (app) {
 
  app.post('/api/followings/:target_id', function(req, res) {
    if (!res.locals.currentUser) {
      res.status(401).json({ "error": "Unauthorized" });
      return;
    }

    let following = new UserFollowings({user_id: res.locals.currentUser, target_id:req.params.id})
    
  //   following.save()
  //   .then((following) => {
  //     res.json({ following: following.data });
  //   }).catch((err) => {
  //     res.status(500).json({ error: err.toString() })
  //   });

    following.create(res.locals.currentUser, req.params.id).then((following) => {
      res.json({ following: following.data });
    }).catch((err) => {
      res.status(500).json({ error: err.toString() })
    });

  });

};


  