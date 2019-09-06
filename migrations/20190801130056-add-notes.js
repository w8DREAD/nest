let dbm;
let type;
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function (db) {
  return  db.runSql('CREATE TABLE notes (id SERIAL primary key, text VARCHAR, date VARCHAR)');
  // return db.runSql('ALTER TABLE notes ADD CONSTRAINT usersnotes \n' +
  //   '  FOREIGN KEY (user_id) REFERENCES users(id);')
};

exports.down = function (db) {
  return db.runSql("DROP TABLE notes");
};

exports._meta = {
  version: 1,
};
