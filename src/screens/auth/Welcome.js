import React from "react";
import {StatusBar, Text, StyleSheet, View, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";

const Welcome = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar style={'light-content'} backgroundColor="#094b4d" />
            <View>
                <Text style={styles.title}>Bienvenido a ArchiControl</Text>
                <Text style={styles.textTitle}>¡Estamos felices de verte!</Text>
                <Text style={styles.text}>
                    Para empezar a gestionar los presupuestos de tus proyectos tendras que
                    proporcionar unos datos personales para configurar la aplicación y
                    obtener la mejor experiencia de usuario.
                </Text>
            </View>
            <View>

            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.textButton}>Ir al formulario</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        padding: 40,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#094b4d',
    },
    textTitle: {
        fontSize: 24,
        color: '#5e6168',
        textAlign: 'justify'
    },
    text: {
        fontSize: 16,
        color: '#5e6168',
        marginTop: 30,
        textAlign: 'justify'
    },
    button: {
        position: 'absolute',
        backgroundColor: '#094b4d',
        width: 200,
        borderWidth: 1,
        borderRadius: 50,
        padding: 20,
        bottom: 30,
        right: 20,

    },
    textButton: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 20,
    }
})
export default Welcome;