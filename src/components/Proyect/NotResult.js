import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

const NotResult = () => {
    return(
        <View>
            <View style={styles.state}>
                <Text style={styles.row}>
                    <MaterialIcons name="search-off" size={150} color="#c7c9ca" />
                </Text>
                <Text style={styles.stateText}>No de encontraron resultados</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    state: {
        position: 'relative',
        alignSelf: 'center',
        justifyContent: 'center',
        height: '90%',
    },
    stateText: {

    },
    row: {
        marginBottom: 20,
        fontSize: 15,
    },
});

export default NotResult;