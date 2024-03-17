import React, {useState} from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const FormSetting = ({data}) => {

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
            if (fileInfo.exists && !fileInfo.isDirectory) {
                setImageUri(url);
            } else {
                setImageUri(null)
            }
        } catch (error) {
            console.log('Error al valida imagen:', error);
            return false;
        }
    }

    return (
        <View>
            <View style={styles.containerImage}>
                {imageUri
                    ? <Image source={{ uri: imageUri }} style={styles.profileImage} />
                    : <Image source={ require('../../utils/img/image-not-fount.jpg') } style={styles.profileImage} />
                }
                <TouchableOpacity
                    onPress={handleImagePicker}
                    style={styles.iconEdit}
                >
                    <View>
                        <Ionicons name="camera-outline" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={styles.info}>Tu información</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Nombre(s)</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Introduce tu nombre'}
                    keyboardType="default"
                    onChangeText={setName}
                    value={name}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Apellido paterno</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Introduce tu apellido paterno'}
                    keyboardType="default"
                    onChangeText={setLastName}
                    value={lastName}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Apellido materno</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Introduce tu apellido materno'}
                    keyboardType="default"
                    onChangeText={setSurname}
                    value={surname}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Telefono</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Introduce tu telefono'}
                    keyboardType="number-pad"
                    maxLength={10}
                    onChangeText={setPhone}
                    value={phone}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Correo electronico</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Introduce tu correo electronico'}
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    value={email}
                />
            </View>
            <TouchableOpacity style={styles.save}>
                <View>
                    <Text style={styles.saveText}>Guardar cambios</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        height: "auto",
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 14,
        borderColor: '#C7C9CA',
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    input: {
        fontSize: 18,
    },
    inputText: {
        fontSize: 14,
        color: '#9b9b9b',
    },
    info: {
        paddingHorizontal: 5,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
    },
    save: {
        height: 60,
        width: '100%',
        borderWidth: 1,
        borderRadius: 14,
        backgroundColor: "#094b4d",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    saveText: {
        color: 'white',
        fontSize: 16,
    },
    containerImage: {
        alignItems: 'center',
    },
    imagePreview: {
        width: 100,
        height: 100,
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
        right: 100,
        bottom: 0,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#C7C9CA',
        borderRadius: 100,
        padding: 12,
    }
})
export default FormSetting;