const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Todo okey");
});

app.post("/create_preference", cors(), async (req, res) => {
    try {
        const response = await axios.post("https://backbarbara.vercel.app/create_preference", req.body);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
});

const PORT = process.env.PORT || 8080; // Usar el puerto definido por el entorno o 8080 como predeterminado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
