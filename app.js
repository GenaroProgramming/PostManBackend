const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const uri = 'mongodb+srv://Genaro69:Genaro69@clusterprueba.c9mra.mongodb.net/databasePrueba?retryWrites=true&w=majority';



mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const itemSchema = new mongoose.Schema({
  name: String,
  edad: Number,
  pais: String
});

const Item = mongoose.model('Prueba', itemSchema);

app.get('/api/prueba', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/prueba', async (req, res) => {
  const newItem = new Item(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/api/prueba', async (req, res) => {
  try {
    await Item.deleteMany({});
    res.json({ message: "Todos los items eliminados" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
