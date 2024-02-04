const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json())

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];
function userExists(username, password) {
    return ALL_USERS.some((user) => {
      return user.username == username && user.password == password;
    });
  }

app.post("/signin",async(req,res)=>{
    const {username,password} = req.body;
    // console.log(username,password);
    if(!userExists(username,password)){
        return res.status(403).json({
            msg:"User doesnt exist in our in memory db",
        })
    }
    let token = jwt.sign({username:username},jwtPassword);
    return res.json({
        token,
    })
})
app.get("/users",(req,res)=>{
    const token = req.headers.authorization;
    try{
        console.log(token);
        const decoded = jwt.verify(token,jwtPassword);
        const username = decoded.username;
        console.log(username);
        res.json({
            ALL_USERS
        })
    }catch(err){
        return res.status(403).json({
            msg:err
        })
    }
})



app.listen(8080,(err)=>{
    if(err){
        throw new Error(err);
    }
    console.log(`http://localhost:8080`);
})