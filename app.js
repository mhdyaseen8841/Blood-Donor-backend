//imports
const express = require('express')
const mongoose =require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const app=express()

const Student = require('./models/Students')

//db connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/students',(err,done)=>{
if(err){
    console.log("error occured")
}
else{
    console.log("donee")
}
})



//middlewares
app.use(cors())
app.use(express.json())


//routes
app.get('/',(req,res)=>{
    console.log('get request')
   
    Student.find().then(result=>{
        console.log('hloooooooooo')
        console.log(result)
        res.status(200).json({msg:"successfull",result})
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error Occured"})
    })
})

app.post('/students',(req,res)=>{
    console.log(req.body.firstname);
    console.log(req.body.lastname);
    console.log(req.body.place);
    
    const student = new Student({
        _id: new mongoose.Types.ObjectId,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        place: req.body.place
    });
    student.save()
    .then(result=>{
        console.log(result)
        res.status(200).json({msg:"successfully submitted"
})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({msg:"Error Occured"})
    })
  
})



app.delete('/student/:id',(req,res)=>{
    const id=req.params.id;
    Student.remove({_id:id},(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("error occured")
        }else{
            res.status(200).json({msg:"successfull"})
        }
    })
})


app.put('/student/:id',(req,res)=>{
   
   const firstname=req.body.firstname;
   const lastname = req.body.lastname;
   const place = req.body.place;
    const id = req.params.id;
    Student.updateOne({_id:id},{$set:{firstname:firstname,lastname:lastname,place:place}})
    .then(res=>{
        console.log(res);
        res.json({msg:"successfully"})
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err)
    })

})
//server

app.listen(5000,()=>{
   console.log('serever connected on port 5000')
})