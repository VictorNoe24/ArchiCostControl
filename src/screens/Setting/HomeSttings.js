import React from "react";
import { View, Text, StatusBar, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Octicons, SimpleLineIcons } from '@expo/vector-icons';
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

const HomeSettings = () => {

    const noAccess = () => {
        Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: 'En desarrollo',
            textBody: 'Actualmente el modulo sigue en desarrollo',
            button: 'cerrar',
          })
    }

    return (
        <View style={styles.container}>
            <StatusBar style={'light-content'} backgroundColor="#094b4d" />
            <View style={styles.user}>
                <View>
                    <Image
                        style={styles.image}
                        source={require('../../utils/img/logo.png')}
                    />
                </View>
                <View>
                    <View style={styles.textNameRow}>
                        <Text style={{ fontSize: 20 }}>Hola, </Text>
                        <Text style={styles.textName}>Noe Flores Aviles</Text>
                    </View>
                    <Text style={{ textAlign: 'center' }}>Bienvenido de nuevo</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={()=> noAccess()}
            >
                <View style={styles.card} onPress={() => console.log('Lo sentimos :(')}>
                    <Octicons style={{ marginRight: '-35%' }} name="repo-template" size={30} color="black" />
                    <Text style={styles.textCard}>Pantillas PDF</Text>
                    <SimpleLineIcons name="lock" size={24} color="black" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=> noAccess()}
            >
                <View style={styles.card} onPress={() => console.log('Lo sentimos :(')}>
                    <Octicons style={{ marginRight: '-15%' }} name="repo-template" size={30} color="black" />
                    <Text style={styles.textCard}>Exportar y importar</Text>
                    <SimpleLineIcons name="lock" size={24} color="black" />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        width: '100%',
        height: '100%'
    },
    user: {
        justifyContent: "center",
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 24,
        padding: 8,
        borderColor: '#C7C9CA',
        height: '40%',
        backgroundColor: '#fff'
    },
    image: {
        borderWidth: 1,
        borderRadius: 50,
        width: 100,
        height: 100,
        marginBottom: 20,
        borderColor: '#C7C9CA',

    },
    textName: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#094b4d'
    },
    textNameRow: {
        flexDirection: 'row'
    },
    card: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 24,
        padding: 24,
        borderColor: '#C7C9CA',
        backgroundColor: '#fff',
        marginTop: '5%',
    },
    textCard: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})

export default HomeSettings;