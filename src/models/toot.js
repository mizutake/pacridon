const db = require('../db');
const Record = require('./record');

class Toot extends Record {
  static tableName() {
    return "toots";
  }
  static columns() {
    return [`user_id`, `body`];
  }

  static create(user, body) {
    return new this({ user_id: user.data.id, body: body }).save();
  }
}

module.exports = Toot;