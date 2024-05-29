const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const uri = "mongodb+srv://<pedropaesporto95>:<9203A8744b>@<cluster-address>/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/data', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('test');
    const collection = database.collection('documents');
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error connecting to database');
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
