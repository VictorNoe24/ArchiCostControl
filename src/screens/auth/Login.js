import React, {useState} from "react";
import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import {ALERT_TYPE, Toast} from "react-native-alert-notification";
import {addUser} from "../../utils/base/db";
import {useAuth} from "../../context/AuthContext";
import {useNavigation} from "@react-navigation/native";

const Login = () => {

    const { saveUser } = useAuth();
    const navigation = useNavigation()

    const [imageUri, setImageUri] = useState(null);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [surname, setSurname] = useState('');

    const [phoneState, setPhoneState] = useState(false);
    const [emailState, setEmailState] = useState(false);
    const [nameState, setNameState] = useState(false);
    const [lastNameState, setLastNameState] = useState(false);
    const [surnameState, setSurnameState] = useState(false);
    const [state, setState] = useState(false);

    const valText = /^([A-Za-z ])+$/;
    const valNum = /^([0-9])+$/;

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

    const insertUser = () => {
        setState(true)
        if(!name || !lastName || !surname || !phone || !email || !imageUri) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Campos vacios',
                textBody: 'Llene todos los campos',
            })
            setState(false);
            return;
        }
        if(!nameState && !lastNameState && !surnameState && !phoneState && !emailState){
            const result = addUser(parseInt(phone), email, name,lastName, surname, imageUri);
            if (result) {
                setState(false)
                const userData = {
                    phone: phone,
                    email: email,
                    name: name,
                    lastname: lastName,
                    surname: surname,
                    image: imageUri,
                }
                saveUser(userData)
                navigation.navigate('Finish')
            }
        }
        setState(false);
    }

    const validateName = (target) => {
        setName(target);
        if( valText.test(target) ) {
            setNameState(false);
        } else {
            setNameState(true);
        }

    }

    const validateLastName = (target) => {
        setLastName(target)
        if( valText.test(target) ) {
            setLastNameState(false)
        } else {
            setLastNameState(true)
        }
    }

    const validateSurname = (target) => {
        setSurname(target)
        if( valText.test(target) ) {
            setSurnameState(false)
        } else {
            setSurnameState(true)
        }
    }

    const validatePhone = (target) => {
        setPhone(target)
        if( valNum.test(target) && target.length === 10) {
            setPhoneState(false)
        } else {
            setPhoneState(true)
        }
    }

    const validateEmail = (target) => {
        setEmail(target)
        if( target.trim().endsWith('@hotmail.com') || target.trim().endsWith('@gmail.com') ) {
            setEmailState(false)
        } else {
            setEmailState(true)
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.containerImage}>
                {imageUri
                    ? <Image source={{ uri: imageUri }} style={styles.profileImage} />
                    : <Image source={ require('../../utils/img/image-not-fount.jpg') } style={styles.profileImage} />
                }
                <TouchableOpacity
                    onPress={() => handleImagePicker()}
                    style={styles.iconEdit}
                >
                    <View>
                        <Ionicons name="camera-outline" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            </View>

            <Text style={styles.info}>Información requerida</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Nombre(s)</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Introduce tu nombre'}
                    keyboardType="default"
                    onChangeText={(event)=> validateName(event)}
                    value={name}
                />
                {nameState && <Text style={styles.validate}>Solo tiene que contener letras</Text> }
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Apellido paterno</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Introduce tu apellido paterno'}
                    keyboardType="default"
                    onChangeText={(event)=> validateLastName(event)}
                    value={lastName}
                />
                {lastNameState && <Text style={styles.validate}>Solo tiene que contener letras</Text>}

            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Apellido materno</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Introduce tu apellido materno'}
                    keyboardType="default"
                    onChangeText={(event)=> validateSurname(event)}
                    value={surname}
                />
                { surnameState && <Text style={styles.validate}>Solo tiene que contener letras</Text>}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Telefono</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Introduce tu telefono'}
                    keyboardType="number-pad"
                    maxLength={10}
                    onChangeText={(event)=> validatePhone(event)}
                    value={phone}
                />
                { phoneState && <Text style={styles.validate}>Solo tiene que contener números</Text>}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Correo electronico</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Introduce tu correo electronico'}
                    keyboardType="email-address"
                    onChangeText={(event)=> validateEmail(event)}
                    value={email}
                />
                { emailState && <Text style={styles.validate}>El correo solo puede ser gmail o hotmail</Text>}
            </View>

            <TouchableOpacity
                style={[styles.save,state && {backgroundColor: 'gray'}]}
                onPress={()=> {insertUser()}}
                disabled={state}
            >
                <View>
                    {
                        state
                        ? (<Text style={styles.saveText}>Guardando información...</Text>) : (<Text style={styles.saveText}>Guardar cambios</Text>)
                    }

                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
    },
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
    },
    validate: {
        color: 'red',
    }
})
export default Login;