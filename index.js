const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");
require("dotenv").config();

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN
});

app.use(express.json());
app.use(cors());

app.get("/", (req,res)=>{
    res.send("Todo okey");
});

app.post("/create_preference", cors(), (req, res) => {
    let preference = {
        items: req.body.items,
        back_urls: {
            success: "https://distribuidora-barbara.vercel.app/paymentsuccess",
            failure: "https://distribuidora-barbara.vercel.app/checkout",
            pending: "",
        },
        auto_return: "approved",
        shipments: {
            cost: req.body.shipment_cost,
            mode: "not_specified",
        },
    };

    mercadopago.preferences
        .create(preference)
        .then(function (response) {
            res.header('Access-Control-Allow-Origin', 'https://distribuidora-barbara.vercel.app');
            res.json({
                id: response.body.id,
            });
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).send("Error interno del servidor");
        });
});

const PORT = process.env.PORT || 8080; // Usar el puerto definido por el entorno o 8080 como predeterminado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
