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
app.post('/api/traducir', async (req, resp)=> {

    const {text, targetLang} = req.body;
    
    const promptSystem1 = "Eres un traductor profesional.";
    const promptSystem2 = "Solo puedes responder con una traduccion directa del texto ingresado por el usuario" +
                          "Cualquier otra respuesta o conversacion esta prohibida";
    const promptUser = `Traduce el siguiente texto al ${targetLang}: ${text}`;    
    
    try {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {role: "system", content: promptSystem1},
            {role: "system", content: promptSystem2},
            {role: "user", content: promptUser}
        ],
        max_tokens: 100,
        response_format: {type: "text"}
    });
    
    const traslateText = completion.choices[0].message.content;
    resp.status(200).json({traslateText});
    
} catch (error) {
    resp.status(500).send({error});
}   

});

app.listen(port, ()=> {
    console.log(`Servidor conectado correctamente al puerto ${port}`);
});