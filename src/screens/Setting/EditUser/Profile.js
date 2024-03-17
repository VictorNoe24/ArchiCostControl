import React, { useEffect, useState } from "react";
import {Button, Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';
const Profile = () => {

    const [imageUri, setImageUri] = useState(null);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [surname, setSurname] = useState('');
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState(false);

    const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        console.log(result.assets[0].uri);
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const validateUrl = async (url) => {
        try {
            const fileInfo = await FileSystem.getInfoAsync(url);
            fileInfo.exists && !fileInfo.isDirectory;
        } catch (error) {
            console.log('Error al valida imagen:', error);
            return false;
        }
    }

    useEffect(() => {
      
    }, [])
    
    return (
        <View style={styles.container}>
            <View style={styles.profileImage}>
                {imageUri
                    ? <Image source={{ uri: imageUri }} style={styles.profileImage} />
                    : <Image source={ require('../../../utils/img/image-not-fount.jpg') } style={styles.profileImage} />
                }
                <TouchableHighlight
                    onPress={handleImagePicker}
                >
                    <View style={styles.iconEdit}>
                        <MaterialIcons name="flip-camera-android" size={30} color="black" />
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    imagePreview: {
        width: 100,
        height: 100,
    },
    containerImage: {
        borderWidth: 1,
        borderRadius: 24,
        width: '100%',
        height: 200,
    },
    profileImage: {
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#C7C9CA',
        width: 150,
        height: 150,
    },
    iconEdit: {
        position: "absolute",
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 100,
        padding: 5,
    }
})

export default Profile;