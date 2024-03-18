import React from "react";
import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useAuth} from "../../context/AuthContext";

const Finish = () => {
    const { getStore } = useAuth();
    return(
        <View style={styles.container}>
            <StatusBar style={'light-content'} backgroundColor="#094b4d" />
            <View>
                <Text style={styles.title}>¡Felicidades!</Text>
                <Text style={styles.textTitle}>Lo has logrado</Text>
                <Text style={styles.text}>
                    Ahora ya puede empezar a gestionar tus presupuesto.
                </Text>
            </View>
            <View>

            </View>
            <TouchableOpacity
                onPress={getStore}
                style={styles.button}
            >
                <Text style={styles.textButton}>Empecemos</Text>
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

export default Finish;