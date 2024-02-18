import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StatusBar, TouchableHighlight } from "react-native";

const NewProyect = () => {

    const navigation = useNavigation();

    return (
        <View>
            <StatusBar style={'light-content'} backgroundColor="#094b4d" />
            <Text>Hoe</Text>

        </View>
    )
}

export default NewProyect;