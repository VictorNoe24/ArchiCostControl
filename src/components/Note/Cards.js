import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useNote } from "../../context/NoteContext";
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from "react-native-alert-notification";

const Cards = ({ id }) => {

    const { data, getNote } = useNote();

    const deleteNote = () => {
        Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: '¿Seguro quieres elimminarlo?',
            textBody: 'Una vez eliminada no se podra recuperar la nota.',
            button: 'close',
            button: 'Aceptar',
          })
    }

    useEffect(() => {
        getNote(id)
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
                            <Text>{info.Concepto}</Text>
                            <Text>{info.Unidad}</Text>
                            <Text>{info.Cantidad}</Text>
                            <Text>{info.PU}</Text>
                            <Text>{info.Importe}</Text>
                            <View style={styles.col}>
                                <TouchableHighlight
                                    style={styles.update}
                                >
                                    <Text style={styles.textUpdate}>Editar</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={styles.delete}
                                    onPress={deleteNote}
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
        color: '#b81414'
    },
})

export default Cards;