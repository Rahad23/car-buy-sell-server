const express = require ('express');
const app =express();
const cors = require('cors');
require('dotenv').config()
const jwt = require('jsonwebtoken');
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
const advertisementCollection = client.db("advertisement").collection("advertise");

// verify jwt token valid user
function verifyJwt(req, res, next){
    const authorize = req.headers.authorization;
    if(!authorize){
        // console.log("No header");
      return res.status(401).send({message: "Unauthorize user"});
    }
    const key = authorize.split(' ')[1];

    jwt.verify(key, process.env.SECURITY_TOKEN, function(err, decode){
      if(err){
        // console.log(err)
        return res.status(401).send({message: "Unauthorize user"});
      }
      req.decode = decode;
      next();
    })
}



app.post('/jwt', (req, res)=>{
    const userEmail = req.body;
    const token = jwt.sign(userEmail, process.env.SECURITY_TOKEN, {expiresIn: '5d'});
    res.send({token});
})

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
// all user get api
app.get('/userss', verifyJwt,async(req, res)=>{
    const query = {};
    const result = await userCollection.find(query).toArray();
    res.send(result);
})
// delete user
app.delete('/userss/:id', async(req, res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result= userCollection.deleteOne(query);
    res.send({acknowledged: true}); 
})

// user information get database
app.get('/users/:email', verifyJwt,async(req, res)=>{
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
app.get('/bmw', verifyJwt,async(req, res)=>{
    try{
        const query = {};
        const result = await bmwCollection.find(query).toArray();
        res.send(result);
    }
    catch(e){
        console.log(e.message);
    }
})
// delete bmw
app.delete('/bmw/:id', async(req, res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result = await bmwCollection.deleteOne(query);
    res.send(result);
})
// add bmw data database
app.post('/bmw', async(req, res)=>{
    const data = req.body;
    const result = await bmwCollection.insertOne(data);
    res.send(result);
})
// email to product fiend
app.get('/bmwSeller/:email', verifyJwt,async(req, res)=>{
    const email = req.params.email;
    const query = {sellerEmail: email};
    const result = await bmwCollection.find(query).toArray();
    res.send(result);
})
app.get('/bmwDetail/:id', async(req,res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result = await bmwCollection.findOne(query);
    res.send(result);
})

// audi section
app.get('/audi', verifyJwt, async(req, res)=>{
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
// audi car delete admin
app.delete('/audi/:id', async(req,res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result = await audiCollection.deleteOne(query);
    res.send(result);
})
// email to product fiend
app.get('/audiSeller/:email', verifyJwt,async(req, res)=>{
    const email = req.params.email;
    const query = {sellerEmail: email};
    const result = await audiCollection.find(query).toArray();
    res.send(result);
})

app.get('/audi/:id', async(req, res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result= await audiCollection.findOne(query);
    res.send(result);
})

// aston martin
app.get('/astonMartin', verifyJwt, async(req, res)=>{
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
// delete aston martin
app.delete('/astonMartin/:id', async(req, res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result = await astonCollection.deleteOne(query);
    res.send(result);
})
// email to product fiend
app.get('/astonSeller/:email', verifyJwt, async(req, res)=>{
    const email = req.params.email;
    const query = {sellerEmail: email};
    const result = await astonCollection.find(query).toArray();
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
// get total order for admin
app.get('/buyerOrder', verifyJwt,async(req, res)=>{
    const query = {};
    const result = await orderCollection.find(query).toArray();
    res.send(result);
})
// delete order
app.delete('/buyerOrder/:id', async(req, res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result = await orderCollection.deleteOne(query);
    res.send(result);
})

// my order get api
app.get('/myOrder/:email', verifyJwt,async(req, res)=>{
    //  const decodeEmail = req.decoded.email;
    // const querys = {userEmail: decodeEmail};
    // const user = await orderCollection.findOne(querys);
    // if(user?.role !== 'admin'){
    //     return res.status(403).send({message: "forbidden access"})
    // }
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


// my all product
// app.post('/myProduct', async(req, res)=>{
//     const data = req.body;
//     const result= await myProductCollection.insertMany(data);
//     res.send(result);
// })

// admin api create
app.put('/adminCreate/:id', async(req, res)=>{
    const userId = req.params.id;
   
    const filter = {_id: ObjectId(userId)};
    const options = {upsert: true};
    const updatedDoc = {
        $set:{
            role: 'admin'
        }
    }
    const result = await userCollection.updateOne(filter, updatedDoc, options);
    res.send(result);
})

// advertisement api
app.post('/advertise', async(req, res)=>{
    const data = req.body;
    const result = await advertisementCollection.insertOne(data);  
    res.send(result);
})
// advertisement product get api
app.get('/advertise', verifyJwt, async(req, res)=>{
    const query = {};
    const result = await advertisementCollection.find(query).toArray();
    res.send(result);
})

app.get('/', (req, res)=>{
    res.send('server is running') 
})

app.listen(port, ()=>{
    console.log(`server running ${port} port`)
})