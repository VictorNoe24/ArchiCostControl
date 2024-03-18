import React from "react"
import {Button, Platform, StyleSheet, View} from "react-native"
import * as Print from 'expo-print';
import {shareAsync} from 'expo-sharing';
import {FontAwesome6} from '@expo/vector-icons';
import {useNote} from "../../context/NoteContext";
import {printAsync} from "expo-print";
import {Asset} from "expo-asset";
import {manipulateAsync} from "expo-image-manipulator";
import {useAuth} from "../../context/AuthContext";

const NoteStack = () => {
    const {dataProyect, data, importe} = useNote();
    const [selectedPrinter, setSelectedPrinter] = React.useState();
    const {dataUser} = useAuth();

    async function pdfHtml () {
        const asset = Asset.fromModule(require('../../../assets/logo.png'));
        const image = await manipulateAsync(asset.localUri ?? asset.uri, [], {base64: true});
        const currentDate = new Date();
        const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        const formattedDate = currentDate.toLocaleDateString('es-ES', options);

        return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Presupuesto</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                    margin: 20px;
                }
    
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    background-color: #fff;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                }
    
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
    
                .logo-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;
                }
    
                .header img {
                    max-width: 150px;
                    height: auto;
                    border-radius: 10px;
                    margin-right: 20px;
                }
    
                .header h2 {
                    color: #094b4d;
                    border-bottom: 2px solid #094b4d;
                    padding-bottom: 10px;
                    margin-top: 10px;
                }
    
                .header p {
                    margin: 5px 0;
                    color: #555;
                }
    
                .contact-info {
                    text-align: left;
                    margin-top: 20px;
                }
    
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }
    
                th, td {
                    padding: 12px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
    
                th {
                    background-color: #094b4d;
                    color: white;
                    font-weight: bold;
                    text-align: center;
                }
    
                td {
                    text-align: center;
                }
    
                tr:hover {
                    background-color: #f5f5f5;
                }
    
                .total {
                    margin-top: 20px;
                    float: right;
                    font-size: 24px;
                    font-weight: bold;
                    color: #094b4d;
                }
            </style>
        </head>
        <body>
    
        <div class="container">
            <div class="header">
                <div class="logo-container">
                    <img src="data:image/jpeg;base64,${image.base64}" alt="Logo de la empresa">
                    <div>
                        <h2>Presupuesto</h2>
                        ${dataProyect.map(data => `
                            <p><strong>Proyecto:</strong> ${data.NameProyect}</p>
                            <p><strong>Cliente:</strong> ${data.NameClient}</p>
                            <p><strong>Dirección:</strong> ${data.Address}</p>
                            <p><strong>Fecha:</strong> ${formattedDate}</span></p>
                        `).join('')}
                    </div>
                </div>
                <div class="contact-info">
                    <p><strong>Servicios:</strong> Construcción, remodelación, impermeabilización, pintura, plomería, electricidad y mantenimiento en general.</p>
                    <p><strong>Teléfono:</strong> ${dataUser[0].Phone}</p>
                    <p><strong>Correo:</strong> ${dataUser[0].Email}</p>
                </div>
            </div>
    
            <table>
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>Unidad</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(dat => `
                        <tr>
                            <td>${dat.Concepto}</td>
                            <td>${dat.Unidad}</td>
                            <td>${dat.Cantidad}</td>
                            <td>$${dat.PU.toFixed(2)}</td>
                            <td>$${dat.Importe.toFixed(2)}</td>
                        </tr>`).join('')}
                </tbody>
            </table>
            <div class="total">
                <p><strong>Total:</strong> $${importe.toFixed(2)}</p>
            </div>
        </div>
    
        </body>
        </html>
        `;
    }

    const print = async () => {
        const html = await pdfHtml();
        await printAsync({html});
    };

    const printToFile = async () => {
        const {uri} = await Print.printToFileAsync({html});
        console.log('File has been saved to:', uri);
        await shareAsync(uri, {UTI: '.pdf', mimeType: 'application/pdf'});
    };

    const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync();
        setSelectedPrinter(printer);
    };

    return (
        <View style={styles.container}>
            <FontAwesome6 name="file-pdf" size={25} color="black" style={styles.separator} onPress={print}/>
            <FontAwesome6 name="share-square" size={25} color="black" style={styles.separator} onPress={printToFile}/>
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