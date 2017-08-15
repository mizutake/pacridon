const db = require('../db');

class Record {
  static tableName() {
    new Error("You should override this method");
  }
  static columns() {
    new Error("You should override this method");
  }
  static find(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM ?? `users` WHERE `id` = ? LIMIT 1;",
        [this.tableName(), id]
      ).then((result) => {
        let rows = result[0];
        let fields = result[1];
        if(rows.length < 1) {
          reject(new Error(`${this.name}(${id}) is not found`));
          return;
        }
        resolve(new this(rows[0]));
      }).catch((error) => {
        reject(error);
      })
    });
  }

  constructor(data) {
    this.data = {};
    this.constructor.columns().forEach((column) => {
      this.data[column] = data[column];
    });
  this.data.id = data.id
  }

  save() {
    if(this.data.id) {
      return this.update();
    } else {
      return this.insert();
    }
  }

  update() {
    let sqlValues = [this.constructor.tableName()];
    sqlValues.push(this.constructor.columns());
    let attributes = {};
    this.constructor.columns().forEach((column) => {
      attributes[column] = this.data[column];
    });
    sqlValues.push(attributes);
    sqlValues.push(this.data.id);
    return new Promise((resolve,reject) => {
      db.query(
        "UPDATE ?? SET ?? WHERE `id` = ?",
        sqlValues
      ).then((result) => {
        resolve(this);
      }).catch((error) => {
        reject(error);
      })
    })
  }

  insert() {
    let sqlValues = [this.constructor.tableName()];
    sqlValues.push(this.constructor.columns());
    let attributes = this.constructor.columns().map((column) => {
      return this.data[column];
    });
    sqlValues.push(attributes);
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO ?? (??) VALUES (?);",
        sqlValues
      ).then((result) => {
        let info = result[0];
        let fields = result[1];
        this.data.id = info.insertId;
        resolve(this);
      }).catch((error) => {
        reject(error);
      })
    })
  }
}

module.exports = Record;