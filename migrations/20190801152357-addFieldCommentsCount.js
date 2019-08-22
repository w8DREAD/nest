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
    db.runSql("CREATE OR REPLACE FUNCTION updCountInsert()\n" +
      "RETURNS trigger\n" +
      "AS\n" +
      "$function$\n" +
      "BEGIN\n" +
      "UPDATE notes SET comCount = (SELECT COUNT(*) FROM comments WHERE noteId = notes.id) WHERE id = NEW.noteId;\n" +
      "END;\n" +
      "$function$\n" +
      "LANGUAGE 'plpgsql';");
    db.runSql("CREATE TRIGGER updCommentsCountInsert\n" +
      "AFTER INSERT\n" +
      "ON comments\n" +
      "FOR EACH ROW\n" +
      "EXECUTE PROCEDURE updCountInsert ( )");

    db.runSql("CREATE OR REPLACE FUNCTION updCountDelete()\n" +
      "RETURNS trigger\n" +
      "AS\n" +
      "$function$\n" +
      "BEGIN\n" +
      "UPDATE notes SET comCount = (SELECT COUNT(*) \n" +
      "FROM comments WHERE noteId = notes.id)\n" +
      "WHERE id = OLD.id;\n" +
      "END;\n" +
      "$function$\n" +
      "LANGUAGE 'plpgsql';");
    db.runSql("CREATE TRIGGER updCommentsCountDelete\n" +
      "AFTER INSERT\n" +
      "ON comments\n" +
      "FOR EACH ROW\n" +
      "EXECUTE PROCEDURE updCountDelete ( )");
    return db.addColumn("notes", "comCount", { type: "int" });
};

exports.down = function(db) {
  db.runSql("DROP TRIGGER updCommentsCountInsert ON comments");
  db.runSql("DROP TRIGGER updCommentsCountDelete ON comments");
  return db.runSql("ALTER TABLE public.notes\n" +
    "DROP COLUMN \"comCount\"");
};

exports._meta = {
  version: 1,
};
