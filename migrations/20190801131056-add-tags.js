

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
  return  db.runSql('CREATE TABLE tags (id SERIAL primary key, tag VARCHAR)');
  // return db.runSql('ALTER TABLE tags ADD CONSTRAINT tagsnotes\n' +
  //   '  FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE;')
};

exports.down = function (db) {
  return db.runSql("DROP TABLE tags");
};

exports._meta = {
  version: 1,
};
