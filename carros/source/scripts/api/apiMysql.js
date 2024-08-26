const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;

// Configuração da conexão com o MySQL
const sequelize = new Sequelize('mysql://user:password@localhost:3306/mydatabase', {
  dialect: 'mysql',
});

// Testa a conexão
sequelize.authenticate()
  .then(() => console.log('Connected to MySQL'))
  .catch(err => console.error('Unable to connect to MySQL:', err));

// Definição do modelo
const Carro = sequelize.define('Carro', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  caracteristicas: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'Carro',
  timestamps: false,
});

// Sincroniza o modelo com o banco de dados
sequelize.sync();

// Middleware para configurar CORS
app.use(cors());

// Middleware para analisar o corpo das requisições
app.use(express.json());

// Roteamento

// Criar um novo carro
app.post('/Carro', async (req, res) => {
  try {
    const carro = await Carro.create(req.body);
    res.status(201).json(carro);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todos os carros
app.get('/Carro', async (req, res) => {
  try {
    const carros = await Carro.findAll();
    res.json(carros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obter um carro por ID
app.get('/Carro/:id', async (req, res) => {
  try {
    const carro = await Carro.findByPk(req.params.id);
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
    const [updated] = await Carro.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const carro = await Carro.findByPk(req.params.id);
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
    const deleted = await Carro.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
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
