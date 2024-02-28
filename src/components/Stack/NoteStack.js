import React, { useEffect } from "react"
import { Button, Platform, StyleSheet, View } from "react-native"
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { FontAwesome6 } from '@expo/vector-icons';
import { pdfHtml } from '../../utils/pdf/pdf'
import { useNote } from "../../context/NoteContext";

const NoteStack = () => {
    const { dataProyect, data, importe } = useNote();
    const [selectedPrinter, setSelectedPrinter] = React.useState();

    const html = pdfHtml(dataProyect, data, importe);

    const print = async () => {
        await Print.printAsync({
            html,
            printerUrl: selectedPrinter?.url,
        });
    };

    const printToFile = async () => {
        const { uri } = await Print.printToFileAsync({ html });
        console.log('File has been saved to:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    };

    const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync();
        setSelectedPrinter(printer);
    };

    return (
        <View style={styles.container}>
            <FontAwesome6 name="file-pdf" size={25} color="black" style={styles.separator} onPress={print} />
            <FontAwesome6 name="share-square" size={25} color="black" style={styles.separator} onPress={printToFile}/>
            {Platform.OS === 'ios' && (
                <>
                    <View style={styles.spacer} />
                    <Button title="Select printer" onPress={selectPrinter} />
                    <View style={styles.spacer} />
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