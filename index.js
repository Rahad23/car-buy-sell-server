const express = require ('express');
const app =express();
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
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
const astonCollection = client.db("astonMartin").collection("aston");
const orderCollection = client.db("buyerOrder").collection("order");

// user store database
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
// user information get database
app.get('/users/:email', async(req, res)=>{
   try{
    const email = req.params.email;
    const query = {email: email};
    const result = await userCollection.findOne(query);
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
// add bmw data database
app.post('/bmw', async(req, res)=>{
    const data = req.body;
    const result = await bmwCollection.insertOne(data);
    res.send(result);
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
// add audi data in database
app.post('/audi', async(req, res)=>{
    const data = req.body;
    const result = await audiCollection.insertOne(data);
    res.send(result);
})
app.get('/audi/:id', async(req, res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result= await audiCollection.findOne(query);
    res.send(result);
})

// aston martin
app.get('/astonMartin', async(req, res)=>{
    const query = {};
    const result = await astonCollection.find(query).toArray();
    res.send(result);
})
// add astonMartin data in database
app.post('/astonMartin', async(req, res)=>{
    const data = req.body;
    const result = await astonCollection.insertOne(data);
    res.send(result);
})
app.get('/astonMartin/:id', async(req, res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result = await astonCollection.findOne(query);
    res.send(result);
})

// buyer order save data base
app.post('/buyerOrder', async(req, res)=>{
    const data = req.body;
    const result = await orderCollection.insertOne(data);
    res.send(result);
})

// my order get api
app.get('/myOrder/:email', async(req, res)=>{
    const email = req.params.email;
    const query = {buyerEmail: email}
    const result = await orderCollection.find(query).toArray();
    res.send(result);
})

// order delete
app.delete('/myOrder/:id', async(req,res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result = await orderCollection.deleteOne(query);
    res.send(result);
});

app.get('/', (req, res)=>{
    res.send('server is running') 
})

app.listen(port, ()=>{
    console.log(`server running ${port} port`)
})