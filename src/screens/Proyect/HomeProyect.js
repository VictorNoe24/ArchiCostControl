import React, { useState } from "react";
import { View, StatusBar, StyleSheet, ScrollView } from "react-native";
import ButtonNew from "../../components/Proyect/ButtonNew";
import Cards from "../../components/Proyect/Cards";
import SearchBar from "../../components/Proyect/SearchBar";

const HomeProyects = () => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);

    console.log(searchPhrase);

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
            >
                <Cards />
            </ScrollView>
            <ButtonNew />
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
    }
});

export default HomeProyects;