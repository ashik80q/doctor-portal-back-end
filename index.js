const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json())

const users = ['Asad', 'Moin', 'Subed', 'Susmita' ,'sohanas'];


const uri = process.env.DB_PATH;

// let client = new MongoClient(uri, { useNewUrlParser: true });



app.get('/services',(req, res) =>{

   let client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("doctor-portal-dStore").collection("services");
      
        collection.find().toArray((err, documents) =>{
           if(err){
               console.log(err);
               res.status(500).send({message:err});
               
           }else{
            res.send(documents);
           }
           
            
        });
        
        console.log('Database connected....');
        client.close();
      });
} );




app.get('/appointment',(req, res) =>{

  let  client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("doctor-portal-dStore").collection("appointments");
      
        collection.find().toArray((err, documents) =>{
           if(err){
               console.log(err);
               res.status(500).send({message:err});
               
           }else{
            res.send(documents);
           }
           
            
        });
        
        console.log('Database connected....');
        client.close();
      });
} );

app.get('/appointment/:date', (req, res)=>{
   const date= req.params.date;

 let  client = new MongoClient(uri, { useNewUrlParser: true });
   client.connect(err => {
       const collection = client.db("doctor-portal-dStore").collection("appointments");
     
       collection.find({date}).toArray((err, documents) =>{
          if(err){
              console.log(err);
              res.status(500).send({message:err});
              
          }else{
           res.send(documents);
          }
          
           
       });
       
       console.log('Database connected....');
       client.close();
     });
})


// post

app.post('/addService', (req, res) =>{
const appointment = req.body;
let client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
    const collection = client.db("doctor-portal-dStore").collection("services");
    // perform actions on the collection object
    collection.insert(appointment,(err, result) =>{
       if(err){
           console.log(err);
           res.status(500).send({message:err});
           
       }else{
        res.send(result.ops[0]);
       }
       
        
    });
    
    console.log('Database connected....');
    client.close();
  });
    
})


app.post('/addAppointment', (req, res) =>{
    const appointment = req.body;
   let client = new MongoClient(uri, { useNewUrlParser: true });
    
    client.connect(err => {
        const collection = client.db("doctor-portal-dStore").collection("appointments");
        // perform actions on the collection object
        collection.insertOne(appointment,(err, result) =>{
           if(err){
               console.log(err);
               res.status(500).send({message:err});
               
           }else{
            res.send(result.ops[0]);
           }
           
            
        });
        
        console.log('Database connected....');
        client.close();
      });
        
    })
const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log("Listening to port 4000"));