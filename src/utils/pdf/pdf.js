import { Asset } from "expo-asset";

const pdfHtml = (dataProyect, datas, total) => {

    const logoUrl = Asset.fromModule(require('../../../assets/logo.png')).uri;
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('es-ES', options);

    const html = `
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
                <img src="${logoUrl}" alt="Logo de la empresa">
                <div>
                    <h2>Presupuesto</h2>
                    ${dataProyect.map(data =>`
                        <p><strong>Proyecto:</strong> ${data.NameProyect}</p>
                        <p><strong>Cliente:</strong> ${data.NameClient}</p>
                        <p><strong>Dirección:</strong> ${data.Address}</p>
                        <p><strong>Fecha:</strong> ${formattedDate}</span></p>
                    `).join('')}
                </div>
            </div>
            <div class="contact-info">
                <p><strong>Servicios:</strong> Construcción, remodelación, impermeabilización, pintura, plomería, electricidad y mantenimiento en general.</p>
                <p><strong>Teléfono:</strong> 7771758739</p>
                <p><strong>Correo:</strong> noe.avi@hotmail.com</p>
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
                ${datas.map(dat => `
                    <tr>
                        <td>${dat.Concepto}</td>
                        <td>${dat.Unidad}</td>
                        <td>${dat.Cantidad}</td>
                        <td>$${dat.PU}</td>
                        <td>$${dat.Importe}</td>
                    </tr>`).join('')}
            </tbody>
        </table>
        <div class="total">
            <p><strong>Total:</strong> $${total}</p>
        </div>
    </div>

    </body>
    </html>

    `;
    
    return html;
}

module.exports = {
    pdfHtml
}