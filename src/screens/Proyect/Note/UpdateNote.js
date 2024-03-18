import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { useNote } from "../../../context/NoteContext";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { updateInfo } from "../../../utils/base/db";
import Input from "../../../components/Note/Input";

const UpdateNote = ({ route }) => {
    const params = route.params;
    const navigation = useNavigation();

    const { getNote, sumImport } = useNote();
    const [concepto, setConcepto] = useState('');
    const [unidad, setUnidad] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [pu, setPU] = useState('');
    const [importe, setImporte] = useState('');

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

        let sum = cantidad * pu;
        sum = sum.toFixed(2)
        console.log(sum)

        const result = updateInfo(
            params.data.id,
            concepto,
            unidad,
            parseFloat(cantidad),
            parseFloat(pu),
            parseFloat(sum),
        );

        if (result) {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Actualizado',
                textBody: 'Se a actualizado correctamente',
                autoClose: 3000
            })
            getNote(params.data.KeyIdProyect);
            sumImport(params.data.KeyIdProyect);
            setTimeout(() => {
                setConcepto('');
                setUnidad('');
                setCantidad('');
                setPU('');
                setImporte('');
                navigation.navigate("ListNote", {id: params.data.KeyIdProyect})
            }, 200)
            return;
        }
    };

    const allData = () => {
        setConcepto(params.data.Concepto)
        setUnidad(params.data.Unidad)
        setCantidad(parseFloat(params.data.Cantidad).toString())
        setPU(parseFloat(params.data.PU).toString())
        setImporte(parseFloat(params.data.Importe).toFixed(2).toString())
    } 
    useEffect(() => {
        allData();
    }, [])
    

    return (
        <>
            <View style={styles.formulario}>
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
})

export default UpdateNote;