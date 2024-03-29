import React, { useEffect, useState } from "react";
import { View, StatusBar, StyleSheet, ScrollView, Text } from "react-native";
import { createTableInfoProyects, createTableProyects} from "../../utils/base/db";
import ButtonNew from "../../components/Proyect/ButtonNew";
import Cards from "../../components/Proyect/Cards";
import SearchBar from "../../components/Proyect/SearchBar";
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import {useAuth} from "../../context/AuthContext";
import NotResult from "../../components/Proyect/NotResult";

const HomeProyects = () => {
    const {getUser, getStore} = useAuth();
    const { data, state, getAllProyects } = useTheme();
    const [searchPhrase, setSearchPhrase] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [clicked, setClicked] = useState(false);
    const [status, setStatus] = useState(false)

    useEffect(() => {
        getUser()
        getStore()
        createTableProyects();
        createTableInfoProyects();
        getAllProyects();
        setIsLoading(false);
    },[])

    if(state) {
        return(
            <View style={styles.state}>
                <Text style={styles.row}>
                    <MaterialIcons name="addchart" size={150} color="#c7c9ca" />
                </Text>
                <Text style={styles.stateText}>Aún no tienes proyectos</Text>
                <Text style={styles.stateText}>Crea un nuevo proyecto</Text>
                <ButtonNew/>
            </View>
        )
    };

    return (
        <View style={styles.container}>
            <StatusBar style={'light-content'} backgroundColor="#094b4d" />
            <View>
                <SearchBar
                    searchPhrase={searchPhrase}
                    setSearchPhrase={setSearchPhrase}
                    clicked={clicked}
                    setClicked={setClicked}
                    data={data}
                    setStatus={setStatus}
                />
            </View>
            { status && <NotResult/>}
            <ScrollView 
                style={styles.rowCard}
                showsVerticalScrollIndicator={false}
            >
                <Cards
                    searchPhrase={searchPhrase}
                    setClicked={setClicked}
                    isLoading={isLoading}
                    proyects={data}
                />
            </ScrollView>
            { !clicked && <ButtonNew/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    rowCard: {
        padding: 10,
        height: '100%',
        marginHorizontal: 5,
    },
    state: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        height: '100%',
    },
    stateText: {
        textAlign: 'center'
    },
    row: {
        marginBottom: 20,
        fontSize: 15,
    },
});

export default HomeProyects;