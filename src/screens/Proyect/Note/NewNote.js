import React, { useState } from "react";
import {ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { addNewInfo } from "../../../utils/base/db";
import { useNote } from "../../../context/NoteContext";
import { useNavigation } from "@react-navigation/native";
import Input from "../../../components/Note/Input";

const NewNote = ({ route }) => {
    const params = route.params;
    const navigation = useNavigation();

    const { getNote, sumImport } = useNote();
    const [concepto, setConcepto] = useState('');
    const [unidad, setUnidad] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [pu, setPU] = useState('');
    const [importe, setImporte] = useState('');

    const handleAgregar = () => {
        if (!concepto || !unidad || !cantidad || !pu ) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Avertencia',
                textBody: 'Llena todos los campos del formulario',
                autoClose: 2000
            });
            return;
        };

        let sum = cantidad * pu;
        sum = sum.toFixed(2)
        console.log(sum)

        const result = addNewInfo(
            params.id,
            concepto,
            unidad,
            parseFloat(cantidad),
            parseFloat(pu),
            parseFloat(sum),
        );

        if (result) {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Agregado',
                textBody: 'Se a registrado una nueva nota',
                autoClose: 3000
            })
            getNote(params.id);
            sumImport(params.id);
            setTimeout(() => {
                setConcepto('');
                setUnidad('');
                setCantidad('');
                setPU('');
                setImporte('');
                navigation.navigate("ListNote", {id: params.id})
            }, 200)
            return;
        }
    };

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.formulario}
            >
                <Input
                    value={concepto}
                    setValue={setConcepto}
                    size={150}
                    titleInput={'Concepto'}
                    placehol={'Introduce el contexto'}
                    multilineState={true}
                />
                <Input
                    value={unidad}
                    setValue={setUnidad}
                    titleInput={'unidad'}
                    placehol={'Introduce la unidad de medida'}
                />
                <Input
                    value={cantidad}
                    setValue={setCantidad}
                    titleInput={'Cantidades'}
                    typeKeyBoard={'numeric'}
                    placehol={'Introduce las unidades del producto'}
                />
                <Input
                    value={pu}
                    setValue={setPU}
                    titleInput={'Precio Unitario'}
                    typeKeyBoard={'numeric'}
                    placehol={'Introduce el preción'}
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={handleAgregar}
                >
                    <View>
                        <Text style={styles.textButton}>Agregar</Text>
                    </View>
                </TouchableHighlight>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    formulario: {
        margin: 20
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