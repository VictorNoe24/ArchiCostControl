import React from "react";
import { Feather, Entypo } from "@expo/vector-icons";
import { StyleSheet, TextInput, View, Keyboard, TouchableOpacity, Text } from "react-native";

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
    return (
        <View style={styles.container}>
            <View
                style={
                    clicked
                        ? styles.searchBar__clicked
                        : styles.searchBar__unclicked
                }
            >
                <Feather
                    name="search"
                    size={20}
                    color="black"
                    style={{ marginLeft: 1 }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Buscar"
                    value={searchPhrase}
                    onChangeText={setSearchPhrase}
                    onFocus={() => {
                        setClicked(true);
                    }}
                />
                {clicked && (
                    <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
                        setSearchPhrase("")
                    }} />
                )}
            </View>
            {clicked && (
                <View style={{ width: '20%' }}>
                    <TouchableOpacity
                        style={styles.buttonCancel}
                        onPress={() => {
                            Keyboard.dismiss();
                            setClicked(false);
                        }}
                    >
                        <Text>cancelar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#d9dbda",
        borderRadius: 50,
        alignItems: "center",
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "80%",
    },
    buttonCancel: {
        backgroundColor: 'fff',
        alignSelf: 'center',
    },
});

export default SearchBar;