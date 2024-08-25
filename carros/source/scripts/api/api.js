const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Importa o pacote cors
const app = express();
const port = 3000;

// Conecte ao MongoDB
const mongoURI = 'mongodb+srv://PedroLucasAbreu:ToixaSn9Pp0RJxui@carros.xi54z.mongodb.net/Carros?retryWrites=true&w=majority&appName=Carros';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Middleware para configurar CORS
app.use(cors());  // Adiciona o middleware cors

// Middleware para analisar o corpo das requisições
app.use(express.json());

// Defina um esquema e modelo do Mongoose
const Schema = mongoose.Schema;

const CarroSchema = new Schema({
  modelo: String,
  marca: String,
  ano: Number,  // Alterado de BigInt para Number
  valor: Number, // Alterado de BigInt para Number
  caracteristicas: String
}, { collection: 'Carro' });

const Carro = mongoose.model('Carro', CarroSchema);

// Roteamento

// Criar um novo carro
app.post('/Carro', async (req, res) => {
  const carro = new Carro(req.body);
  try {
    const result = await carro.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todos os carros
app.get('/Carro', async (req, res) => {
  try {
    const carros = await Carro.find();
    res.json(carros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obter um carro por ID
app.get('/Carro/:id', async (req, res) => {
  try {
    const carro = await Carro.findById(req.params.id);
    if (carro) {
      res.json(carro);
    } else {
      res.status(404).json({ error: 'Carro não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar um carro por ID
app.put('/Carro/:id', async (req, res) => {
  try {
    const carro = await Carro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (carro) {
      res.json(carro);
    } else {
      res.status(404).json({ error: 'Carro não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar um carro por ID
app.delete('/Carro/:id', async (req, res) => {
  try {
    const result = await Carro.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: 'Carro deletado' });
    } else {
      res.status(404).json({ error: 'Carro não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
