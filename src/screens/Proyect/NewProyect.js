import React, { useState } from "react";
import {View, Text, StatusBar, TouchableHighlight, Button, TextInput, StyleSheet, ScrollView} from "react-native";
import { addNewProyects } from "../../utils/base/db";
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { useNavigation } from "@react-navigation/native";
import { useTheme } from '../../context/ThemeContext';
import Input from "../../components/Note/Input";

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
                type: ALERT_TYPE.WARNING,
                title: 'Avertencia',
                textBody: 'Llena todos los campos del formulario',
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
                title: 'Agregado',
                textBody: 'Se a registrado un nuevo proyecto',
                autoClose: 3000
            })
            getAllProyects();
            setTimeout(()=>{
                setNameProject('');
                setNameClient('');
                setAddress('');
                navigation.navigate("HomeProyects")
            },200)
            return;
        }
    }

    return (
        <>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <StatusBar style={'light-content'} backgroundColor="#094b4d" />
                <Text style={styles.label}>Nombre del Proyecto:</Text>
                <Input
                    value={nameProyect}
                    setValue={setNameProject}
                    titleInput={'Nombre del Proyecto'}
                    placehol={''}
                />
                <Text style={styles.label}>Nombre del Cliente:</Text>
                <Input
                    value={nameClient}
                    setValue={setNameClient}
                    titleInput={'Nombre del Cliente'}
                    placehol={''}
                />
                <Text style={styles.label}>Dirección:</Text>
                <Input
                    value={address}
                    setValue={setAddress}
                    titleInput={'Dirección'}
                    placehol={''}
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={addProyect}
                >
                    <View>
                        <Text style={styles.textButton}>Agregar</Text>
                    </View>
                </TouchableHighlight>
            </ScrollView>
        </>
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