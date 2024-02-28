import React, { createContext, useContext, useState } from "react";
import { db } from "../utils/base/db";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [dataProyect, setDataProyect] = useState([]);
    const [state, setState] = useState(true);
    const [importe, setImporte] = useState()

    const sumImport = (KeyIdProyect) => {
        try {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT SUM(Importe) AS TotalImporte FROM INFO WHERE KeyIdProyect = ?`,
                    [KeyIdProyect],
                    (_, results) => {
                        if (results.rows.length > 0) {
                            const totalImporte = results.rows.item(0).TotalImporte;
                            setImporte(totalImporte);
                        } else {
                            console.log(`No hay registros para el proyecto con ID ${KeyIdProyect}`);
                        }
                    },
                    (_, error) => {
                        console.error('Error al consultar el total del importe:', error);
                    }
                );
            });
        } catch (error) {
            console.error('Error al ejecutar la transacción:', error);
        }
    }

    const getNote = (KeyIdProyect) => {
        try {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM INFO WHERE KeyIdProyect = ?`,
                    [KeyIdProyect],
                    (_, results) => {
                        if (results.rows.length > 0) {
                            setData(results.rows._array);
                            setState(false);
                        } else {
                            setState(true);
                        }
                    },
                    (_, error) => {
                        console.error('Error al consultar los datos del proyecto:', error);
                    }
                );
            });
        } catch (error) {
            console.error('Error al ejecutar la transacción:', error);
        }
    }

    const getProyectId = (projectId) => {
        try {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM PROYECTS WHERE id = ?`,
                    [projectId],
                    (_, results) => {
                        setDataProyect(results.rows._array);
                    },
                    (_, error) => {
                        console.error('Error al consultar datos del proyecto:', error);
                    }
                );
            });
        } catch (error) {
            console.error('Error al ejecutar la transacción:', error);
        }
    };


    return (
        <NoteContext.Provider value={{ dataProyect, data, state, importe, getNote, sumImport, getProyectId }}>
            {children}
        </NoteContext.Provider>
    );
};

export const useNote = () => {
    return useContext(NoteContext);
};