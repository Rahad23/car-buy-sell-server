const express = require ('express');
const app =express();
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();

// midle ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.xa1zyf9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const userCollection = client.db("userCollection").collection("user");
const carQuality = client.db("carQuelity").collection("carquelity");
const bmwCollection = client.db("bmwCollection").collection("bmw");
const audiCollection = client.db("audiCollaction").collection("audi");

app.post('/users', async(req, res)=>{
    try{
    const data = req.body;
    // console.log(data);
    const result = await userCollection.insertOne(data);
    res.send(result);
    }
    catch(e){
        console.log(e.message);
    }
})

app.get('/carQuality', async(req, res)=>{
    try{
        const query = {};
        const result = await carQuality.find(query).toArray();
        res.send(result);
    }
    catch(e){
        console.log(e.message);
    }
})
// bmw section
app.get('/bmw', async(req, res)=>{
    try{
        const query = {};
        const result = await bmwCollection.find(query).toArray();
        res.send(result);
    }
    catch(e){
        console.log(e.message);
    }
})

app.get('/bmwDetail/:id', async(req,res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result = await bmwCollection.findOne(query);
    res.send(result);
})
// audi section
app.get('/audi', async(req, res)=>{
    const query = {};
    const result = await audiCollection.find(query).toArray();
    res.send(result);
})

app.get('/', (req, res)=>{
    res.send('server is running') 
})

app.listen(port, ()=>{
    console.log(`server running ${port} port`)
})