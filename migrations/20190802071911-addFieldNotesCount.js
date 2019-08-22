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
    "UPDATE users SET notesCount = (SELECT COUNT(*)" +
    "FROM notes WHERE userId = users.id)" +
    "WHERE id = NEW.userId;\n" +
    "END;\n" +
    "$function$\n" +
    "LANGUAGE 'plpgsql';");
  db.runSql("CREATE TRIGGER updNotesCountInsert\n" +
    "AFTER INSERT\n" +
    "ON notes\n" +
    "FOR EACH ROW\n" +
    "EXECUTE PROCEDURE updNotesCountInsert ( )");

  db.runSql("CREATE OR REPLACE FUNCTION updNotesDelete()\n" +
    "RETURNS trigger\n" +
    "AS\n" +
    "$function$\n" +
    "BEGIN\n" +
    "UPDATE users SET notesCount = (SELECT COUNT(*) \n" +
    "FROM notes WHERE userId = users.id)\n" +
    "WHERE id = OLD.userId;\n" +
    "END;\n" +
    "$function$\n" +
    "LANGUAGE 'plpgsql';");
  db.runSql("CREATE TRIGGER updNotesCountDelete\n" +
    "AFTER INSERT\n" +
    "ON notes\n" +
    "FOR EACH ROW\n" +
    "EXECUTE PROCEDURE updNotesCountDelete ( )");

  return db.addColumn('users', 'notesCount', { type: 'int' });
};

exports.down = function (db) {
  db.runSql('DROP TRIGGER updNotesCountInsert ON notes');
  db.runSql('DROP TRIGGER updNotesCountDelete ON notes');
  return db.runSql("ALTER TABLE public.users\n" +
    "DROP COLUMN \"notesCount\"");
};

exports._meta = {
  version: 1,
};
