let dbm;
let type;
let seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql("CREATE TABLE likes (id SERIAL primary key, noteId INTEGER REFERENCES notes (id) ON DELETE CASCADE NOT NULL,\n"
    + "userId INTEGER NOT NULL REFERENCES users (id))");
};

exports.down = function(db) {
  return db.dropTable("likes");
};

exports._meta = {
  version: 1,
};
