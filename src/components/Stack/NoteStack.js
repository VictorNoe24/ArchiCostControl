import React from "react"
import {Button, Platform, StyleSheet, TouchableOpacity, View} from "react-native"
import * as Print from 'expo-print';
import {shareAsync} from 'expo-sharing';
import {FontAwesome6} from '@expo/vector-icons';
import {useNote} from "../../context/NoteContext";
import {pdfHtml} from "../../utils/pdf/pdf";
import * as FileSystem from 'expo-file-system';
import {ALERT_TYPE, Toast} from "react-native-alert-notification";

const NoteStack = () => {
    const {dataProyect, data, importe} = useNote();
    const [selectedPrinter, setSelectedPrinter] = React.useState();

    const html = pdfHtml(dataProyect, data, importe);

    const validate = () => {
        if(importe == null) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Aun no tienes notas creadas',
                autoClose: 1000
            })
            return true;
        }
        return false;
    }

    const print = async () => {
        if(validate()) {
            return;
        }
        await Print.printAsync({
            html,
            printerUrl: selectedPrinter?.url,
        });
    };

    const printToFile = async () => {
        if(validate()) {
            return;
        }
        Toast.show({
            type: ALERT_TYPE.WARNING,
            title: 'Generando...',
            textBody: 'Se esta generando el pdf',
            autoClose: false
        })
        const fileName = `Proyecto ${dataProyect[0].NameProyect}.pdf`;
        const newPath = FileSystem.documentDirectory + fileName;

        const {uri} = await Print.printToFileAsync({html});

        await FileSystem.moveAsync({
            from: uri,
            to: newPath,
        });
        await shareAsync(newPath, {UTI: '.pdf', mimeType: 'application/pdf'});
        Toast.hide();
    };

    const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync();
        setSelectedPrinter(printer);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={print}>
                <FontAwesome6 name="file-pdf" size={30} color="black" style={styles.separator}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={printToFile}>
                <FontAwesome6 name="share-square" size={30} color="black" style={styles.separator}/>
            </TouchableOpacity>
            {Platform.OS === 'ios' && (
                <>
                    <View style={styles.spacer}/>
                    <Button title="Select printer" onPress={selectPrinter}/>
                    <View style={styles.spacer}/>
                    {selectedPrinter ? (
                        <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
                    ) : undefined}
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    separator: {
        marginLeft: 20,
    }
})

export default NoteStack;