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
    await db.runSql("CREATE OR REPLACE FUNCTION updCountInsert()\n" +
      "RETURNS trigger\n" +
      "AS\n" +
      "$function$\n" +
      "BEGIN\n" +
      "UPDATE notes SET com_count = (SELECT COUNT(*) FROM comments WHERE noteId = NEW.\"noteId\") WHERE id = NEW.\"noteId\";\n" +
      "RETURN NEW;\n" +
      "END;\n" +
      "$function$\n" +
      "LANGUAGE 'plpgsql';");
    await db.runSql("CREATE TRIGGER updCommentsCountInsert\n" +
      "AFTER INSERT\n" +
      "ON comments\n" +
      "FOR EACH ROW\n" +
      "EXECUTE PROCEDURE updCountInsert ( )");

    await db.runSql("CREATE OR REPLACE FUNCTION updCountDelete()\n" +
      "RETURNS trigger\n" +
      "AS\n" +
      "$function$\n" +
      "BEGIN\n" +
      "UPDATE notes SET com_count = (SELECT COUNT(*) \n" +
      "FROM comments WHERE \"noteId\" = OLD.\"noteId\")\n" +
      "WHERE id = OLD.id;\n" +
      "RETURN NEW;\n" +
      "END;\n" +
      "$function$\n" +
      "LANGUAGE 'plpgsql';");
    await db.runSql("CREATE TRIGGER updCommentsCountDelete\n" +
      "AFTER DELETE\n" +
      "ON comments\n" +
      "FOR EACH ROW\n" +
      "EXECUTE PROCEDURE updCountDelete ( )");
    return db.addColumn("notes", "com_count", { type: "int" });
};

exports.down = async function(db) {
  await db.runSql("DROP TRIGGER updCommentsCountInsert ON comments");
  await db.runSql("DROP TRIGGER updCommentsCountDelete ON comments");
  return db.runSql("ALTER TABLE public.notes\n" +
    "DROP COLUMN \"com_count\"");
};

exports._meta = {
  version: 1,
};
