const express = require ('express');
const app =express();
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();

// midle ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.xa1zyf9.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const collection = client.db("carModels").collection("cars");

app.post('/carsModels', async(req, res)=>{
    const data = req.body;
    const result = await collection.insertMany(data);
    res.send(result);
})




app.get('/', (req, res)=>{
    res.send('server is running') 
})

app.listen(port, ()=>{
    console.log(`server running ${port} port`)
})