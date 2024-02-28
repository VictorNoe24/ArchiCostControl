import React from "react";
import { StyleSheet, View, TouchableHighlight} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from '@expo/vector-icons';
const ButtonNew = ({id, sizeB}) => {
    const navigation = useNavigation();
    return (
        <View style={[styles.container, {left: `${sizeB}`}]}>
            <TouchableHighlight
                style={styles.button}
                onPress={()=> navigation.navigate("NewNote",{id: id})}
            >
                <FontAwesome6 name="add" size={35} color="#fff" style={styles.row} />
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
        width: 'auto',
    },
    addButton: {
        width: 60,
        height: 60,
        backgroundColor: '#094b4d',
        padding: 10,
        borderRadius: 100,
        position: "absolute",
        bottom: 20,
        margin: 0,
        right: 20,
    },
});

export default ButtonNew;