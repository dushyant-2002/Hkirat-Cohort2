const express = require("express");
const app = express();
const PORT = 8080;
const {createTodo,updateTodo} = require("./types");
const  mongoose  = require("mongoose");
const { Todo } = require("./models/Todo");
const cors = require("cors");
app.use(cors());//for allowing silent requests from local host of frontend/ allowing cors policy
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/React-Todo")
.then(()=>{
    console.log("DB is Connected")
})
.catch((err)=>{
    throw  err;
})

app.post("/todo",async(req,res)=>{
    const createPayload = req.body;
    console.log('recieved');
    console.log(req.body);
    console.log(createPayload);
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"you sent the wrong inputs",
        })
        return;
    }
    // now put it in mongodb
    await Todo.create({
        title:createPayload.title,
        description:createPayload.description,
        completed:false
    })
    res.json({
        msg:"Todo created",
    })
})

app.get("/todos",async(req,res)=>{
    const todos =await Todo.find({});
    console.log(todos);
    res.json({
        todos
    })


})

app.put("/completed",async(req,res)=>{
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"you sent the wrong inputs"
        })
        return;
    }
    await Todo.updateOne({_id:updatePayload.id},{completed:true})
    // console.log(todo);
    res.json({
        msg:"marked"
    })
})

app.listen(PORT,(err)=>{
    if(err) throw new err;
    console.log(`https://localhost:${8080}`);
})