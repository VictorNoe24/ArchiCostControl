import React, { useState } from "react";
import { View, Text, StatusBar, TouchableHighlight, Button, TextInput, StyleSheet } from "react-native";
import { addNewProyects } from "../../utils/base/db";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { useNavigation } from "@react-navigation/native";
import { useTheme } from '../../context/ThemeContext';

const NewProyect = () => {
    const { getAllProyects } = useTheme();
    const [nameProyect, setNameProject] = useState('');
    const [nameClient, setNameClient] = useState('');
    const [address, setAddress] = useState('');

    const navigation = useNavigation();

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const addProyect = () => {
        if (!nameProyect || !nameClient || !address) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Llena todo el formulario',
                autoClose: 2000
            });
            return;
        }

        const currentDate = getCurrentDate();
        const result = addNewProyects(nameProyect, currentDate, nameClient, address);
        console.log(result);

        if (result) {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Good',
                textBody: 'Se a registrado tu proyecto',
                autoClose: 3000
            })
            setNameProject('');
            setNameClient('');
            setAddress('');
            getAllProyects();
            setTimeout(()=>{
                navigation.navigate("HomeProyects")
            },3000)
            return;
        }
    }

    return (
        <AlertNotificationRoot>
            <View style={styles.container}>
                <StatusBar style={'light-content'} backgroundColor="#094b4d" />
                <Text style={styles.label}>Nombre del Proyecto:</Text>
                <TextInput
                    style={styles.input}
                    value={nameProyect}
                    onChangeText={setNameProject}
                />
                <Text style={styles.label}>Nombre del Cliente:</Text>
                <TextInput
                    style={styles.input}
                    value={nameClient}
                    onChangeText={setNameClient}
                />
                <Text style={styles.label}>Dirección:</Text>
                <TextInput
                    style={styles.input}
                    value={address}
                    onChangeText={setAddress}
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={addProyect}
                >
                    <View>
                        <Text style={styles.textButton}>Agregar</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </AlertNotificationRoot>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    button: {
        width: "100%",
        backgroundColor: "#094b4d",
        borderRadius: 15,
        height: "auto",
        alignSelf: "center",
        alignItems: "center",
        padding: 10
    },
    textButton: {
        color: '#fff',
        fontSize: 15,
        marginVertical: 10
    },
});

export default NewProyect;