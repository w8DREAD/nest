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
  return db.runSql('CREATE TABLE notes (id SERIAL primary key, text VARCHAR, date VARCHAR,\n'
    + 'userId INTEGER REFERENCES users (id) ON DELETE CASCADE NOT NULL)');
};

exports.down = function (db) {
  return db.dropTable('notes');
};

exports._meta = {
  version: 1,
};
