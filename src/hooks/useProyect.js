import React, { useEffect, useState } from "react";
import { db } from "../utils/base/db";

const useProyect = () => {
    const [data, setData] = useState([]);
    const [state, setState] = useState(true);

    const getAllProyects = () => {
        try {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM PROYECTS',
                    [],
                    (txObj, resultSet) => {
                        setData(resultSet.rows._array)
                        if (resultSet.rows._array.length !== 0) {
                            setState(false)
                        } else {
                            setState(true)
                        }
                    }
                );
            });
        } catch (error) {
            console.error('Error al consultar los proyectos:', error);
        }
    };

    useEffect(() => {
        getAllProyects();
    }, [])
    
    return{
        data,
        state,
        getAllProyects,
        setData,
    }
}

export default useProyect;