const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// Configurações do MongoDB
const uri = 'mongodb+srv://PedroLucasAbreu:ToixaSn9Pp0RJxui@carros.xi54z.mongodb.net/Carros?retryWrites=true&w=majority&appName=Carros'; // URL do MongoDB local ou da nuvem
const dbName = 'Carros';
const client = new MongoClient(uri);

app.use(express.static('public')); // Servir arquivos estáticos

// Conectar ao MongoDB e iniciar o servidor
client.connect(err => {
    if (err) throw err;
    console.log('Conectado ao MongoDB');

    const db = client.db(dbName);
    const produtosCollection = db.collection('carro');

    // Endpoint para obter produtos
    app.get('/carro', (req, res) => {
        produtosCollection.find().toArray((err, items) => {
            if (err) throw err;
            
            console.log(res.json(items));
        });
    });

    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
});
