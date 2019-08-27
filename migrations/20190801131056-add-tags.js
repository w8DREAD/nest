

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

exports.up = function (db) {
  return db.runSql('CREATE TABLE tags (id SERIAL primary key, tag VARCHAR, note_id INTEGER REFERENCES notes (id) ON DELETE CASCADE NOT NULL)');
};

exports.down = function (db) {
  return db.runSql("DROP TABLE tags");
};

exports._meta = {
  version: 1,
};
