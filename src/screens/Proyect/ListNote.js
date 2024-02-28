import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useNote } from "../../context/NoteContext";
import ButtonNew from "../../components/Note/ButtonNew";
import Cards from "../../components/Note/Cards";
import { AlertNotificationRoot } from "react-native-alert-notification";

const ListNote = ({ route }) => {
    const params = route.params;
    const { state, importe, getNote, sumImport, getProyectId } = useNote();

    useEffect(() => {
        getNote(params.id)
        sumImport(params.id);
        getProyectId(params.id);
    }, [])
    

    if (state) {
        return (
            <View style={styles.state}>
                <Text style={styles.stateText}>
                    <MaterialIcons name="addchart" size={150} color="#c7c9ca" />
                </Text>
                <Text style={styles.stateText}>Aún no tienes notas</Text>
                <Text style={styles.stateText}>Crea una nueva nota</Text>
                <ButtonNew
                    id={params.id}
                    sizeB={"50%"}
                />
            </View>
        )
    };

    return (
        <AlertNotificationRoot>
            <View style={styles.container}>
                <ScrollView>
                    <Cards
                        id={params.id}
                    />
                </ScrollView>
                <ButtonNew
                    id={params.id}
                    sizeB={"90%"}
                />
            </View>
        </AlertNotificationRoot>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: "100%",
        width: "100%",
    },
    state: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    row: {
        padding: 6,
    },
    stateText: {
        textAlign: 'center'
    },
})
export default ListNote;