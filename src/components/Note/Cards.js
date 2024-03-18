import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useNote } from "../../context/NoteContext";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { deleteInfoId } from '../../utils/base/db'
import { useNavigation } from "@react-navigation/native";

const Cards = ({ id }) => {

    const navigation = useNavigation();
    const { data, getNote } = useNote();

    const deleteNote = (idDelete) => {
        Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: '¿Seguro quieres eliminarlo?',
            textBody: 'Una vez eliminada no se podra recuperar la nota.',
            button: 'Aceptar',
            autoClose: true,
            onPressButton: () => notification(idDelete),

        })
    }

    const notification = (idDelete) => {
        try {
            deleteInfoId(idDelete);
        } catch (error) {
            console.error(error);
        } finally {
            Dialog.hide();
            getNote(id);
        }
    }

    useEffect(() => {
        getNote(id);
    }, [])

    return (

        <View>
            {data.map((info, index) => (
                <View
                    style={styles.card}
                    key={index}
                >
                    <View style={styles.cardBorder}>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.textConcep}>{info.Concepto}</Text>
                        <View style={styles.rowText}>
                            <View>
                                <Text style={styles.textTh}>Unidad</Text>
                                <Text style={styles.textTd}>{info.Unidad}</Text>
                            </View>
                            <View>
                                <Text style={styles.textTh}>Cantidades</Text>
                                <Text style={styles.textTd}>{info.Cantidad.toFixed(2)}</Text>
                            </View>
                            <View>
                                <Text style={styles.textTh}>Importe</Text>
                                <Text style={styles.textTd}>${info.PU.toFixed(2)}</Text>
                            </View>
                        </View>
                        <Text style={styles.texTotal}>Total: {info.Importe.toFixed(2)}</Text>
                        <View style={styles.col}>
                            <TouchableHighlight
                                style={styles.update}
                                activeOpacity={0.9}
                                underlayColor="#F7F6F6"
                                onPress={() => navigation.navigate("UpdateNote", {data: info})}
                            >
                                <Text style={styles.textUpdate}>Editar</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.delete}
                                activeOpacity={0.9}
                                underlayColor="#F7F6F6"
                                onPress={() => deleteNote(info.id)}
                            >
                                <Text style={styles.textDelete}>Eliminar</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 24,
        borderColor: '#C7C9CA',
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 24,
        elevation: 5,
    },
    cardBorder: {
        height: '100%',
        width: '5%',
        borderTopStartRadius: 24,
        borderBottomStartRadius: 24,
        backgroundColor: '#094b4d'
    },
    row: {
        padding: 20,
        height: '80%',
        width: "95%",
    },
    col: {
        flexDirection: 'row',
        marginTop: 20,
    },
    update: {
        padding: 10,
        width: '40%',
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#09122b',
        marginRight: 10,
    },
    textUpdate: {
        alignSelf: 'center',
        color: '#09122b',
    },
    delete: {
        padding: 10,
        width: '40%',
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#b81414',
    },
    textDelete: {
        alignSelf: 'center',
        color: '#b81414',

    },
    textConcep: {
        fontSize: 24,
        color: '#094b4d',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    rowText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    textTh: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    textTd: {
        fontSize: 16,
        color: '#5e6168',
    },
    texTotal: {
        fontSize: 25,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        color: '#094b4d'
    },
})

export default Cards;