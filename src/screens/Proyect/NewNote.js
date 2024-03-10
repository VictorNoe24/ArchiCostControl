import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { addNewInfo } from "../../utils/base/db";
import { useNote } from "../../context/NoteContext";
import { useNavigation } from "@react-navigation/native";

const NewNote = ({ route }) => {
    const params = route.params;
    const navigation = useNavigation();

    const { getNote, sumImport } = useNote();
    const [concepto, setConcepto] = useState('');
    const [unidad, setUnidad] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [pu, setPU] = useState('');
    const [importe, setImporte] = useState('');

    const sumCantidad = (text) => {
        setCantidad(text)
        if ((pu !== 0.0)) {
            let result = text * pu;
            result = result.toFixed(2)
            setImporte(result)
        }
    }

    const sumPU = (text) => {
        setPU(text)
        if ((cantidad !== 0.0)) {
            let result = cantidad * text;
            result = result.toFixed(2);
            setImporte(result)
        }
    }

    const handleAgregar = () => {
        if (!concepto || !unidad || !cantidad || !pu || !importe) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Llena todo el formulario',
                autoClose: 2000
            });
            return;
        };


        const result = addNewInfo(
            params.id,
            concepto,
            unidad,
            parseFloat(cantidad),
            parseFloat(pu),
            parseFloat(importe),
        );

        if (result) {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Good',
                textBody: 'Se a registrado tu proyecto',
                autoClose: 3000
            })
            setConcepto('');
            setUnidad('');
            setCantidad(0.0);
            setPU(0.0);
            setImporte(0.0);
            getNote(params.id);
            sumImport(params.id);
            setTimeout(() => {
                navigation.navigate("ListNote", {id: params.id})
            }, 3000)
            return;
        }
    };

    return (
        <>
            <View style={styles.formulario}>
                <Text style={styles.label}>Concepto:</Text>
                <TextInput
                    editable
                    multiline
                    style={[styles.input, {height: 150}]}
                    value={concepto}
                    onChangeText={text => setConcepto(text)}
                />
                <Text style={styles.label}>Unidad:</Text>
                <TextInput
                    style={styles.input}
                    value={unidad}
                    onChangeText={text => setUnidad(text)}
                />
                <Text style={styles.label}>Cantidad:</Text>
                <TextInput
                    style={styles.input}
                    value={cantidad}
                    onChangeText={text => sumCantidad(text)}
                    keyboardType="numeric"
                />
                <Text style={styles.label}>PU:</Text>
                <TextInput
                    style={styles.input}
                    value={pu}
                    onChangeText={text => sumPU(text)}
                    keyboardType="numeric"
                />
                <Text style={styles.label}>Importe:</Text>
                <TextInput
                    style={styles.input}
                    value={importe}
                    keyboardType="numeric"
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={handleAgregar}
                >
                    <View>
                        <Text style={styles.textButton}>Agregar</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    formulario: {
        margin: 20
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    button: {
        width: "100%",
        backgroundColor: "#094b4d",
        borderRadius: 15,
        height: "auto",
        alignSelf: "center",
        alignItems: "center",
        padding: 10
    },
    textButton: {
        color: '#fff',
        fontSize: 15,
        marginVertical: 10
    }
});

export default NewNote;