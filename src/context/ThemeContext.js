import React, { createContext, useContext, useState } from "react";
import { db } from "../utils/base/db";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
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


    return (
        <ThemeContext.Provider value={{data, state, getAllProyects}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};