const express = require('express');
const cors = require('cors');
const app = express();
const users=require('./sample.json');
const fs=require('fs');

// Enable CORS for all routes and origins
app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => {
  res.json(users);
});

app.delete("/users/:id",(req,res)=>{
   let Id=Number(req.params.id);
   let filterusers=users.filter((user)=>user.id !== Id);
   fs.writeFile("./sample.json",JSON.stringify(filterusers),(err,data)=>{
    return res.json(filterusers)
   });
   
});
 
app.post("/users",(req,res)=>{
    let {name,age,city} = req.body;
    let id=Date.now()
    if(!name || !age || !city){
        res.status(400).send({message:"all fiels required"});
    };
    users.push({id,name,age,city});
    fs.writeFile("./sample.json",JSON.stringify(users),(err,data)=>{
        return res.json({message:" user added succussfully"});
       });

});
app.patch("/users/:id",(req,res)=>{
    let {name,age,city} = req.body;
    let id = Number(req.params.id);
    if(!name || !age || !city){
        res.status(400).send({message:"all fiels required"});
    };
    let index=users.findIndex((user)=>user.id==id);
    users.splice(index,1,{...req.body});
    fs.writeFile("./sample.json",JSON.stringify(users),(err,data)=>{
        return res.json({message:" user updated succussfully"});
       });

});


app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
app.use(cors({
    origin: 'http://localhost:5173',
    methods:["GET","POST","DELETE","PATCH"]
  }));
