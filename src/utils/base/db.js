import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('archicostcontrol-test1.db');

const createTableProyects = () => {
    try {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS PROYECTS (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    NameProyect TEXT, 
                    Date TEXT, 
                    NameClient TEXT,
                    Address TEXT
                )`,
                []
            );
        });
    } catch (error) {
        console.error('Error al crear la tabla PROYECTS:', error);
    }
};

const createTableInfoProyects = () => {
    try {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS INFO (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    KeyIdProyect INTEGER,
                    Concepto TEXT,
                    Unidad TEXT,
                    Cantidad DOUBLE,
                    PU DOUBLE,
                    Importe DOUBLE,
                    FOREIGN KEY (KeyIdProyect) REFERENCES PROYECTS(id)
                )`,
                []
            );
        });
    } catch (error) {
        console.error('Error al crear la tabla INFO:', error);
    }
};

const addNewProyects = (nameProyect, date, nameClient, address) => {
    
    try {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO PROYECTS (NameProyect, Date, NameClient, Address) VALUES (?, ?, ?, ?)`,
                [nameProyect, date, nameClient, address],
                (obj, resurt) => console.log(resurt.insertId)
            );
        });
        return true;
    } catch (error) {
        console.error('Error al agregar el proyecto:', error);
    }
};

const addNewInfo = (KeyIdProyect, Concepto, Unidad, Cantidad, PU, Importe) => {
    try {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO INFO (KeyIdProyect, Concepto, Unidad, Cantidad, PU, Importe) VALUES (?, ?, ?, ?, ?, ?)`,
                [KeyIdProyect, Concepto, Unidad, Cantidad, PU, Importe],
                (_, results) => {
                    console.log('Registro insertado con éxito. ID de fila: ', results.insertId);
                },
                (_, error) => {
                    console.error('Error al insertar datos en la tabla INFO: ', error);
                }
            );
        });
        return true;
    } catch (error) {
        console.error('Error al ejecutar la transacción:', error);
    }
}

const deleteInfoId = (idInfo) => {
    console.log(idInfo);
    try {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM INFO WHERE id = ?`,
                [idInfo],
                (_, resultSet) => {
                    console.log('Elemento eliminado con éxito');
                },
                (_, error) => {
                    console.error('Error al eliminar el elemento:', error);
                    return false;
                }
            );
            return true;
        });
    } catch (error) {
        console.error('Error al eliminar el elemento:', error);
    }
}

export {
    createTableProyects,
    createTableInfoProyects,
    addNewProyects,
    addNewInfo,
    deleteInfoId,
    db,
};