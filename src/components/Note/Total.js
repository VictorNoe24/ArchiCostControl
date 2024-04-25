import React from "react";
import {StyleSheet, Text, View} from "react-native";

const Total = ({total}) => {
    const formatCurrency = (amount) => {
        const parts = amount.toFixed(2).toString().split('.');
        const integerPart = parts[0];
        const decimalPart = parts[1];
        const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return '$' + formattedIntegerPart + '.' + decimalPart;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{formatCurrency(parseFloat(total))}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: '2%',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 25,
        backgroundColor: '#094B4D',
        width: 'auto',
    },
    text: {
        color: '#fff',
        fontWeight: "bold",
        fontSize: 18
    }
})
export default Total;