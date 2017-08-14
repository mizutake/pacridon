const db = require('../db');
const Record = require('./record');

class Toot extends Record {
  static tableName() {
    return "toots";
  }
  static columns() {
    return [`user_id`, `body`];
  }
}

module.exports = Toot;