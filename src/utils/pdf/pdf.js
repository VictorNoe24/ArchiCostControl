import {useAuth} from "../../context/AuthContext";

const pdfHtml = (dataProyect, datas, total) => {

    const { dataUser } = useAuth();
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('es-ES', options);

    const formatCurrency = (amount) => {
        const parts = amount.toFixed(2).toString().split('.');
        const integerPart = parts[0];
        const decimalPart = parts[1];
        const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return '$' + formattedIntegerPart + '.' + decimalPart;
    }
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
                text-align: justify;
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
                text-align: end;
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
                <img src="https://efavhov.stripocdn.email/content/guids/CABINET_7e9d1b9fef7c0d398bf6bcb4e7fc130e2e670e4d793fc60eecbbcf986fcbb699/images/logo.png" alt="Logo de la empresa">
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
                ${datas.map(dat => `
                    <tr>
                        <td style="text-align: start">${dat.Concepto}</td>
                        <td>${dat.Unidad}</td>
                        <td>${parseFloat(dat.Cantidad).toFixed(2)}</td>
                        <td>${formatCurrency(parseFloat(dat.PU))}</td>
                        <td>${formatCurrency(parseFloat(dat.Importe))}</td>
                    </tr>`).join('')}
            </tbody>
        </table>
        <div class="total">
            <p><strong>Total:</strong> ${formatCurrency(parseFloat(total))}</p>
        </div>
    </div>

    </body>
    </html>
    `;
}

module.exports = {
    pdfHtml
};