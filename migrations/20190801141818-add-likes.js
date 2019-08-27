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

exports.up = async function(db) {
  await db.runSql(`CREATE TABLE likes (
    id SERIAL primary key,
    note_id INTEGER REFERENCES notes (id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users (id)
   )`);
  return  db.runSql("CREATE INDEX idxLikes ON likes (note_id ASC, user_id ASC);");
};

exports.down = async function(db) {
 await db.runSql("DROP INDEX idxLikes");
  return db.dropTable("likes");
};

exports._meta = {
  version: 1,
};
