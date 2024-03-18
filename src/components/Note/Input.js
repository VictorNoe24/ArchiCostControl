import React from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";

const Input = (
    {
        value, setValue,
        size = 80,
        stateMessage = false,
        titleInput, placehol,
        typeKeyBoard = 'default',
        messageError = null,
        multilineState = false,
    }
) => {

    return (
        <View style={[styles.inputContainer, {height: size}]}>
            <Text style={styles.inputText}>{titleInput}</Text>
            <TextInput
                style={multilineState ? styles.inputMultiline : styles.input }
                placeholder={placehol}
                multiline={multilineState}
                keyboardType={typeKeyBoard}
                value={value}
                onChangeText={(value)=> setValue(value)}
            />
            {stateMessage && <Text style={styles.validate}>{messageError}</Text> }
        </View>
    )
};

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff'
    },
    input: {
        fontSize: 18,
    },
    inputMultiline:{
        fontSize: 18,
        height: '70%',
    },
    saveText: {
        color: 'white',
        fontSize: 16,
    },
    inputText: {
        fontSize: 14,
        color: '#9b9b9b',
    },
    validate: {
        color: 'red',
    }
})

export default Input;