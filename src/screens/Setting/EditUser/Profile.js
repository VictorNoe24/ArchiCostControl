import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import FormSetting from "../../../components/Setting/FormSetting";
const Profile = () => {

    return (
        <ScrollView style={styles.container}>
            <View>
                <FormSetting/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
})

export default Profile;