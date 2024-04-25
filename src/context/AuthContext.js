import React, {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createTableCategory, createTableUser, createTableUserCategory, db} from "../utils/base/db";
import {log} from "expo/build/devtools/logger";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [state, setState] = useState(null);
    const [dataUser, setDataUser] = useState([]);

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('auth', jsonValue);
        } catch (e) {
            // saving error
        }
    };

    const recet = async () => {
        try {
            await AsyncStorage.setItem('auth', '');
        } catch (e) {
            console.error(e)
        }
    };

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('auth');
            setState(jsonValue != null ? JSON.parse(jsonValue) : null);
        } catch (e) {
            console.error(e)
        }
    };

    const getStore = () => {
        getData();
    };

    const saveUser = (value) => {
        storeData(value);
    }

    const getUser = () => {
        try {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM USERS WHERE Email = ?`,
                    [state.email],
                    (_, result) => {
                        setDataUser(result.rows._array)
                    },
                    (_, error) => {
                        console.log(error.message);
                        setDataUser([])
                    }
                )
            })
        } catch (e) {
            console.error(e);
        }
    }

    const getUserTest = (email) => {
        try {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM USERS WHERE Email = ?`,
                    [email],
                    (_, result) => {
                        setDataUser(result.rows._array)
                    },
                    (_, error) => {
                        console.log(error.message);
                        setDataUser([])
                    }
                )
            })
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        //recet()
        getData();
        console.log(state)
        createTableUser();
        createTableCategory();
        createTableUserCategory();
    }, []);

    return (
        <AuthContext.Provider value={{state, dataUser, saveUser, storeData, getStore, getUser, getUserTest}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}