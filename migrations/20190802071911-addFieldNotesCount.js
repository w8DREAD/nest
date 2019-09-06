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
  db.runSql("CREATE OR REPLACE FUNCTION updNotesInsert()\n" +
    "RETURNS trigger\n" +
    "AS\n" +
    "$function$\n" +
    "BEGIN\n" +
    "UPDATE users SET notes_count = (SELECT COUNT(*)" +
    "FROM notes WHERE \"userId\" = users.id)" +
    "WHERE id = NEW.\"userId\";\n" +
    "RETURN NEW;\n" +
    "END;\n" +
    "$function$\n" +
    "LANGUAGE 'plpgsql';");
  db.runSql("CREATE TRIGGER updNotesCountInsert\n" +
    "AFTER INSERT\n" +
    "ON notes\n" +
    "FOR EACH ROW\n" +
    "EXECUTE PROCEDURE updNotesInsert ( )");

  db.runSql("CREATE OR REPLACE FUNCTION updNotesDelete()\n" +
    "RETURNS trigger\n" +
    "AS\n" +
    "$function$\n" +
    "BEGIN\n" +
    "UPDATE users SET notes_count = (SELECT COUNT(*) \n" +
    "FROM notes WHERE \"userId\" = users.id)\n" +
    "WHERE id = OLD.\"userId\";\n" +
    "RETURN NEW;\n" +
    "END;\n" +
    "$function$\n" +
    "LANGUAGE 'plpgsql';");
  db.runSql("CREATE TRIGGER updNotesCountDelete\n" +
    "AFTER delete\n" +
    "ON notes\n" +
    "FOR EACH ROW\n" +
    "EXECUTE PROCEDURE updNotesDelete ( )");

  return db.addColumn('users', 'notes_count', { type: 'int' });
};

exports.down = function (db) {
  db.runSql('DROP TRIGGER updNotesCountInsert ON notes');
  db.runSql('DROP TRIGGER updNotesCountDelete ON notes');
  return db.runSql("ALTER TABLE public.users\n" +
    "DROP COLUMN \"notes_count\"");
};

exports._meta = {
  version: 1,
};
