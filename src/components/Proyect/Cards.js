import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';

const Cards = ({ searchPhrase, proyects, isLoading }) => {
    const navigation = useNavigation();

    const formateDate = (dateString) => {
        const months = [
            "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];

        const date = new Date(dateString);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        return `${day} de ${months[monthIndex]} del ${year}`;
    }

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
            {filterProyectsByName().map((proyect) => (
                <TouchableOpacity
                    key={proyect.id}
                    onPress={() => navigation.navigate("ListNote", { id: proyect.id })}
                    style={styles.container}
                >
                    <View>
                        <View style={styles.row}>
                            <Text style={styles.textDate}>{formateDate(proyect.Date)}</Text>
                            <TouchableOpacity
                                onPress={() => console.log("Hola gai")}
                            >
                                <SimpleLineIcons name="options-vertical" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.textProyect}>{proyect.NameProyect}</Text>
                        <Text style={styles.textClient}>{proyect.NameClient}</Text>
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
        borderRadius: 24,
        borderColor: '#C7C9CA',
        borderWidth: 1,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textClient: {
        fontSize: 16,
        color: '#666',
        marginTop: 20,
    },
    textProyect: {
        fontSize: 24,
        color: '#094b4d',
        fontWeight: 'bold',
    },
    textDate: {
        fontSize: 16,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default Cards;