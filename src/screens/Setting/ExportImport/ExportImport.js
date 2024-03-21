import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {exportarBaseDeDatos, importarBaseDeDatos} from "../../../utils/base/databaseUtils";

const ExportImport = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.card}
                onPress={()=>exportarBaseDeDatos()}
            >
                <MaterialCommunityIcons name="file-export-outline" size={65} color="#094b4d" />
                <Text style={styles.text}>Export</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={()=>importarBaseDeDatos()}
            >
                <MaterialCommunityIcons name="file-import-outline" size={65} color="#094b4d" />
                <Text style={styles.text}>Import</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: '100%',
    },
    card: {
        width: '50%',
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 16,
        padding: 20,
        backgroundColor: '#fff',
        marginBottom: 20,
        borderColor: '#c7c9ca',
    },
    text: {
        fontSize: 20,
        color: '#094b4d',
        fontWeight: 'bold',
    }
})

export default ExportImport;
