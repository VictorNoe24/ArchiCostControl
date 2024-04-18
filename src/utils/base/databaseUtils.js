import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { db } from './db';
import {ALERT_TYPE, Toast} from "react-native-alert-notification";

const rutaArchivoExportado = FileSystem.documentDirectory + 'archicostcontrol-test1.db';

const errorAlert = (message) => {
    Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: `Error al ${message} la base de datos`,
        autoClose: 2000,
    })
}

const successAlert = (message) => {
    Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Exito',
        textBody: `Base de datos ${message} exitosamente`,
        autoClose: 2000,
    })
}
const exportarBaseDeDatos = async () => {
    try {
        console.log(db)
        db._db._db.closed();
        await FileSystem.copyAsync({
            from: db._db._name,
            to: rutaArchivoExportado,
        });
        db._db._db = SQLite.openDatabase(db._db._name);
        successAlert('exportada')
    } catch (error) {
        errorAlert('exportar')
        console.error('Error al exportar la base de datos:', error);
    }
};

const importarBaseDeDatos = async () => {
    try {
        await FileSystem.copyAsync({
            from: rutaArchivoExportado,
            to: db._db._name,
        });
        successAlert('importada')
    } catch (error) {
        errorAlert('importar')
        console.error('Error al importar la base de datos:', error);
    }
};

export { exportarBaseDeDatos, importarBaseDeDatos };
