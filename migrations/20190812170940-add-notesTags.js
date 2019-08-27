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
 await db.runSql("CREATE TABLE notes_tags (note_id INTEGER REFERENCES notes (id) ON DELETE CASCADE NOT NULL,\n"
    + "tag_id INTEGER REFERENCES tags (id) ON DELETE CASCADE NOT NULL)");
 await db.runSql("CREATE OR REPLACE FUNCTION updNotesTags()\n" +
    "RETURNS trigger\n" +
    "AS\n" +
    "$function$\n" +
    "BEGIN\n" +
    "INSERT INTO notes_tags (note_id, tag_id) VALUES (NEW.note_id, NEW.id);\n" +
   "RETURN NEW;\n" +
    "END;\n" +
    "$function$\n" +
    "LANGUAGE 'plpgsql';");
 return db.runSql("CREATE TRIGGER updNotesTagsInsert\n" +
    "AFTER INSERT\n" +
    "ON tags\n" +
    "FOR EACH ROW\n" +
    "EXECUTE PROCEDURE updNotesTags ( )");
};

exports.down = async function(db) {
  await db.runSql("DROP TRIGGER updNotesTagsInsert ON tags");
  return db.runSql("DROP TABLE notes_tags");
};

exports._meta = {
  version: 1,
};
