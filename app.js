import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//vista
app.use("/", express.static("public"));

//middelware para procesar json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//api de openIA
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

//Rutas
app.post('/api/traducir', (req, resp)=> {

    const {text, targetLang} = req.body;
    
    const promptSystem1 = "Eres un traductor profesional.";
    const promptSystem2 = "Solo puedes responder con una traduccion directa del texto ingresado por el usuario" +
                          "Cualquier otra respuesta o conversacion esta prohibida";
    const promptUser = `Traduce el siguiente texto al ${targetLang}: ${text}`;

    return resp.status(200).json({
        message: '.....'
    });
});





app.listen(port, ()=> {
    console.log(`Servidor conectado correctamente al puerto ${port}`);
});