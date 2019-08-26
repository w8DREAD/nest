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
  db.runSql('CREATE TABLE notesTags (noteId INTEGER REFERENCES notes (id) ON DELETE CASCADE NOT NULL,\n'
    + 'tagId INTEGER REFERENCES tags (id) ON DELETE CASCADE NOT NULL)');
  db.runSql("CREATE OR REPLACE FUNCTION updNotesTags()\n" +
    "RETURNS trigger\n" +
    "AS\n" +
    "$function$\n" +
    "BEGIN\n" +
    "INSERT INTO notestags (noteId, tagId) VALUES (NEW.noteId, NEW.id);\n" +
    "END;\n" +
    "$function$\n" +
    "LANGUAGE 'plpgsql';");
 return db.runSql("CREATE TRIGGER updNotesTagsInsert\n" +
    "AFTER INSERT\n" +
    "ON tags\n" +
    "FOR EACH ROW\n" +
    "EXECUTE PROCEDURE updNotesTags ( )");
};

exports.down = function (db) {
  db.runSql('DROP TRIGGER updNotesTagsInsert ON tags');
  return db.dropTable('notestags');
};

exports._meta = {
  version: 1,
};
