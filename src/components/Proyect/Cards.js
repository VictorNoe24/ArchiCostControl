import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Cards = () => {
    return (
        <View>
            <TouchableOpacity
                onPress={()=>console.log('Hola')}
                style={styles.container}
            >
                <Text>18 de enero del 2024</Text>
                <Text>Colocación de losa</Text>
                <Text>Something short and simple here </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 24,
        width: '100%',
        borderRadius: '12px',
        borderRadius: 15,
        borderColor: '#C7C9CA',
        borderWidth: 1,
        marginBottom: 2,
    }
})

export default Cards;