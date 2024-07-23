import * as SQLite from 'expo-sqlite';
//archicostcontrol-TEST2.db
const db = SQLite.openDatabase('archicostcontrol-TEST2.db');

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

const createTableCategory = () => {
    try {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS CATEGORIES (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT
                )`
            )
        })
    } catch (error) {
        console.log('Error al crear la tabla CATEGORIES:', error);
    }
}

const createTableUserCategory = () => {
    try {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS CATEGORIES (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    id_user INTEGER,
                    id_category INTEGER,
                    FOREIGN KEY (id_user) REFERENCES USERS(id),
                    FOREIGN KEY (id_category) REFERENCES CATEGORIES(id)
                )`
            )
        })
    } catch (error) {
        console.log('Error al crear la tabla CATEGORIES:', error);
    }
}

const createTableUser = () => {
    try {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS USERS (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    Phone LONG UNIQUE,
                    Email VARCHAR(100) UNIQUE,
                    Name VARCHAR(45),
                    LastName VARCHAR(36),
                    Surname VARCHAR(36),
                    Password VARCHAR(15),
                    Image TEXT
                )`
            )
        })
    } catch (error) {
        console.error('Erroe al crear la tabla USER:', error);
    }
}

const addUser = (phone, email, name, lastname, surname, image) => {
    try {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO USERS (Phone, Email, Name, LastName, Surname, Image) VALUES (?, ?, ?, ?, ?, ?)`,
                [phone, email, name, lastname, surname, image],
                (_, result) => {
                    console.log(result.insertId)
                },
                (_, error) => {
                    console.log(error)
                }
             )
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

const updateUser = (name, lastname, surname, image, email) => {
    try {
        db.transaction(tx => {
            tx.executeSql(

                `UPDATE USERS SET Name = ?, LastName = ?, Surname = ?, Image = ? WHERE Email = ?`,
                [name, lastname, surname, image, email],
                (_, result) => {

                },
                (_, error) => {
                    console.log(error)
                }
            )
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}


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

const updateInfo = (id, newConcepto, newUnidad, newCantidad, newPU, newImporte) => {
    let status = true;
    try {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE INFO SET Concepto = ?, Unidad = ?, Cantidad = ?, PU = ?, Importe = ? WHERE id = ?`,
                [newConcepto, newUnidad, newCantidad, newPU, newImporte, id],
                (_, results) => {
                    return status = true;
                },
                (_, error) => {
                    console.error('Error al actualizar la información en la tabla INFO:', error)
                    return status = false;
                }
            );
        });
        return status;
    } catch (error) {
        console.error('Error al ejecutar la función de actualización:', error);
        return false;
    }
};

const deleteInfoId = (idInfo) => {
    try {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM INFO WHERE id = ?`,
                [idInfo],
                (_, results) => {
                    return true;
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
        return false;
    }
}

export {
    createTableProyects,
    createTableInfoProyects,
    createTableUserCategory,
    createTableCategory,
    createTableUser,
    addNewProyects,
    addNewInfo,
    deleteInfoId,
    updateInfo,
    addUser,
    updateUser,
    db,
};