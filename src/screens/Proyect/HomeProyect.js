import React, { useEffect, useState } from "react";
import { View, StatusBar, StyleSheet, ScrollView, Text } from "react-native";
import { createTableInfoProyects, createTableProyects, createTableCategory, createTableUser, createTableUserCategory} from "../../utils/base/db";
import ButtonNew from "../../components/Proyect/ButtonNew";
import Cards from "../../components/Proyect/Cards";
import SearchBar from "../../components/Proyect/SearchBar";
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const HomeProyects = () => {
    const { data, state, getAllProyects } = useTheme();
    const [searchPhrase, setSearchPhrase] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        createTableProyects();
        createTableInfoProyects();
        getAllProyects();
        createTableCategory(); 
        createTableUser();
        createTableUserCategory();
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
                />
            </View>
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
            <ButtonNew/>
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