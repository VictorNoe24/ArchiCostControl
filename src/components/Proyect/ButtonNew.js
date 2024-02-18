import React from "react";
import { StyleSheet, View, TouchableHighlight, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
const ButtonNew = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableHighlight
                onPress={() => navigation.navigate("NewProyect")}
                style={styles.button}
            >
                <View>
                    <Text style={styles.text}>CREAR PROYECTO</Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: '2%',
        alignSelf: 'center',
    },
    button: {
        height: 'auto',
        padding: 12,
        borderRadius: 50,
        backgroundColor: '#094B4D',
        width: 200,
    },
    text: {
        color: '#fff',
        alignSelf: 'center',
    }
});

export default ButtonNew;