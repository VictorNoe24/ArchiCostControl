import * as SQLite from 'expo-sqlite';

const databaseName = 'archicostcontrol-TEST2.db';

export const CreateTables = async () => {
    try {
        const db = await SQLite.openDatabaseAsync(databaseName);
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                name_project TEXT NOT NULL,
                date TEXT NOT NULL,
                name_client TEXT NOT NULL,
                address TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
                updated_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS info_projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                key_id_project INTEGER NOT NULL,
                concept TEXT NOT NULL,
                unit TEXT NOT NULL,
                quantity DOUBLE NOT NULL,
                unit_price DOUBLE NOT NULL,
                total DOUBLE NOT NULL,
                created_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
                updated_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
                FOREIGN KEY (key_id_project) REFERENCES projects (id)
            );

            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                name TEXT NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
                updated_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS user_categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                id_user INTEGER NOT NULL,
                id_category INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
                updated_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
                FOREIGN KEY (id_user) REFERENCES users (id),
                FOREIGN KEY (id_category) REFERENCES categories (id)
            );

            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                phone LONG UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                name VARCHAR(45) NOT NULL,
                last_name VARCHAR(36) NOT NULL,
                surname VARCHAR(36) NOT NULL,
                password VARCHAR(15) NOT NULL,
                image TEXT NULL,
                created_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
                updated_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL
            );
        `);
    } catch (error) {
        console.error('Error al crear las tablas:', error);
    }
};

export const CreateTriggers = async () => {
    try {
        const db = await SQLite.openDatabaseAsync(databaseName);
        await db.execAsync(`
            -- Trigger para insertar created_at y updated_at en 'projects'
            CREATE TRIGGER IF NOT EXISTS insert_project_created_at
            AFTER INSERT ON projects
            FOR EACH ROW
            BEGIN
                UPDATE projects SET created_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
            END;

            CREATE TRIGGER IF NOT EXISTS update_project_updated_at
            AFTER UPDATE ON projects
            FOR EACH ROW
            BEGIN
                UPDATE projects SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
            END;

            -- Trigger para insertar created_at y updated_at en 'info_projects'
            CREATE TRIGGER IF NOT EXISTS insert_info_project_created_at
            AFTER INSERT ON info_projects
            FOR EACH ROW
            BEGIN
                UPDATE info_projects SET created_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
            END;

            CREATE TRIGGER IF NOT EXISTS update_info_project_updated_at
            AFTER UPDATE ON info_projects
            FOR EACH ROW
            BEGIN
                UPDATE info_projects SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
            END;

            -- Trigger para insertar created_at y updated_at en 'categories'
            CREATE TRIGGER IF NOT EXISTS insert_category_created_at
            AFTER INSERT ON categories
            FOR EACH ROW
            BEGIN
                UPDATE categories SET created_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
            END;

            CREATE TRIGGER IF NOT EXISTS update_category_updated_at
            AFTER UPDATE ON categories
            FOR EACH ROW
            BEGIN
                UPDATE categories SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
            END;

            -- Trigger para insertar created_at y updated_at en 'user_categories'
            CREATE TRIGGER IF NOT EXISTS insert_user_category_created_at
            AFTER INSERT ON user_categories
            FOR EACH ROW
            BEGIN
                UPDATE user_categories SET created_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
            END;

            CREATE TRIGGER IF NOT EXISTS update_user_category_updated_at
            AFTER UPDATE ON user_categories
            FOR EACH ROW
            BEGIN
                UPDATE user_categories SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
            END;

            -- Trigger para insertar created_at y updated_at en 'users'
            CREATE TRIGGER IF NOT EXISTS insert_user_created_at
            AFTER INSERT ON users
            FOR EACH ROW
            BEGIN
                UPDATE users SET created_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
            END;

            CREATE TRIGGER IF NOT EXISTS update_user_updated_at
            AFTER UPDATE ON users
            FOR EACH ROW
            BEGIN
                UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
            END;
        `);
    } catch (error) {
        console.error('Error al crear los triggers:', error);
    }
};

const migrateToVersion1 = async (db) => {
    await db.execAsync(`
        ALTER TABLE PROYECTS RENAME TO projects;
        ALTER TABLE INFO RENAME TO info_projects;
        ALTER TABLE CATEGORIES RENAME TO categories;
        ALTER TABLE USERS RENAME TO users;
        
        ALTER TABLE projects ADD COLUMN created_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL;
        ALTER TABLE projects ADD COLUMN updated_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL;

        ALTER TABLE info_projects ADD COLUMN created_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL;
        ALTER TABLE info_projects ADD COLUMN updated_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL;
    `);

    await db.execAsync(`UPDATE db_version SET version = 1;`);
    console.log("Migración a la versión 1 completada.");
};

const migrateToVersion2 = async (db) => {
    await db.execAsync(`
        ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL;
        ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL;
    `);

    await db.execAsync(`UPDATE db_version SET version = 2;`);
    console.log("Migración a la versión 2 completada.");
};

const updateDatabase = async () => {
    const db = await SQLite.openDatabaseAsync(databaseName);

    db.transaction(tx => {
        // Crear tabla de versiones si no existe
        tx.executeSql(`
            CREATE TABLE IF NOT EXISTS db_version (
                version INTEGER
            );
        `);

        // Insertar versión inicial si no existe
        tx.executeSql(`
            INSERT OR IGNORE INTO db_version (version) VALUES (0);
        `);
    });

    db.transaction(tx => {
        // Obtener la versión actual
        tx.executeSql('SELECT version FROM db_version', [], (_, { rows }) => {
            let currentVersion = rows.item(0).version;

            if (currentVersion < 1) {
                migrateToVersion1(db);
            }
            if (currentVersion < 2) {
                migrateToVersion2(db);
            }
        });
    });
};


