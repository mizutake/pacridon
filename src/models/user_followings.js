

class user_followings extends Record {
  
    static tableName() {
      return "user_followings";
    }
  
    static columns() {
      return ["user_id", "target_id"]
    }

    static create(UserFollowing){
      return new this({user_id: res.locals.currentUser, target_id:req.params.id}).save();
    }

  }
  
  module.exports = user_followings;