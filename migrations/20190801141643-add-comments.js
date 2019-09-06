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
  return  db.runSql('CREATE TABLE comments (id SERIAL primary key, text VARCHAR)');
  // await db.runSql('ALTER TABLE comments ADD CONSTRAINT userscomments FOREIGN KEY (user_id) REFERENCES users(id);');
  // return db.runSql('ALTER TABLE comments ADD CONSTRAINT notescomments\n' +
  //   '  FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE;')
};

exports.down = function (db) {
  return db.runSql("DROP TABLE comments");
};

exports._meta = {
  version: 1,
};
