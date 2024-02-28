import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Cards = ({ searchPhrase, proyects, isLoading }) => {
    const navigation = useNavigation();

    const filterProyectsByName = () => {
        if (searchPhrase) {
            return proyects.filter(proyect => proyect.NameProyect.toLowerCase().includes(searchPhrase.toLowerCase()));
        }
        return proyects;
    };

    if (isLoading) {
        return (
            <View style={styles.loading}>
                <Text>Cargando Proyectos</Text>
                <ActivityIndicator size="large" color="#094b4d" />
            </View>
        );
    }

    return (
        <View>
            {filterProyectsByName().map((proyect, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate("ListNote", {id: proyect.id})}
                    style={styles.container}
                >
                    <View>
                        <Text style={styles.textName}>{proyect.NameClient}</Text>
                        <Text style={styles.textProyect}>{proyect.NameProyect}</Text>
                        <Text style={styles.textLocation}>{proyect.Address}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        width: '100%',
        borderRadius: '12px',
        borderRadius: 15,
        borderColor: '#C7C9CA',
        borderWidth: 1,
        marginBottom: 10,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textLocation: {
        fontSize: 16,
        color: '#666',
        marginTop: 20,
    },
    textProyect: {
        fontSize: 24
    },
    textName: {
        fontSize: 16,
        marginBottom: 20,
    }
})

export default Cards;