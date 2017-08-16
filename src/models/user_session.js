const UUID = require('uuid/v4');
const Record = require(`./record`);

class UserSession extends Record {
   static tableName() {
  return "user_sessions";
  }
 static columns() {
    return ["user_id"];
  }

  static insertColumns() {
    return ["id", "user_id"];
  }

  insert() {
    this.data.id = UUID();
    return super.insert();
  }
}

module.exports = UserSession;