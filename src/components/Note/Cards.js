import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useNote } from "../../context/NoteContext";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { deleteInfoId } from '../../utils/base/db'

const Cards = ({ id }) => {

    const { data, getNote } = useNote();

    const deleteNote = (idDelete) => {
        Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: '¿Seguro quieres elimminarlo?',
            textBody: 'Una vez eliminada no se podra recuperar la nota.',
            button: 'Aceptar',
            onPressButton: () => notification(idDelete)
        })
    }

    const notification = (idDelete) => {
        try {
            deleteInfoId(idDelete);   
        } catch (error) {
            console.error(error);
        } finally {
            getNote();
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
                        <Text>Unidad: {info.Unidad}</Text>
                        <Text>Cantidades {info.Cantidad}</Text>
                        <Text>Importe {info.PU}</Text>
                        <Text>Total: {info.Importe}</Text>
                        <View style={styles.col}>
                            <TouchableHighlight
                                style={styles.update}
                            >
                                <Text style={styles.textUpdate}>Editar</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.delete}
                                onPress={()=> deleteNote(info.id)}
                            >
                                <Text style={styles.textDelete}>Eliinar</Text>
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
        borderRadius: 10,
        borderColor: '#C7C9CA',
        flexDirection: 'row',
        marginBottom: 20,
    },
    cardBorder: {
        height: '100%',
        width: '2%',
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10,
        backgroundColor: '#094b4d'
    },
    row: {
        padding: 20,
        height: '80%',
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
        color: '#09122b'
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
        fontSize: 30,
        color: '#094b4d',
        fontWeight: 'bold'
    }
})

export default Cards;