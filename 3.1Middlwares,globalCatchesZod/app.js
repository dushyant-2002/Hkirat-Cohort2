const express = require("express");
const zod = require("zod");
const app = express();
app.use(express.json());//for parsing req.body content coz body can be anything html,text ,json or other things

let numberOfRequests = 0;
 
function calculateRequests(req,res,next){
    numberOfRequests++;
    console.log(numberOfRequests);
    next();
}
app.use(calculateRequests);
// app.get("/health-checkup",calculateRequest,(req,res)=>{//it will be done by app.use(calucateRequests)
//     res.send("hi");
// })
// app.post("/health-checkup",(req,res)=>{
//     const kidneys = req.body.kidneys;
    
//     //way of input validation but let we need a validation like array of numbers of booleans then there will be many if else in our code
//     // if(!kidneys){
//     //     res.json({
//     //         msg:"wrong inputs"
//     //     })
//     // }
//     const kidneyLength = kidneys.length;

//     res.send("you have " + kidneyLength + "kidneys");
// })
// // global catches
// app.use(function(err,req,res,next){
//     res.json({
//         msg:"Sorry something is up with our server"
//         // msg:err
//     })
// })
//using zod
const schema = zod.array(zod.number());
//validate this input
/*
{
    email:string => email
    password : atleast 8 char
    country : "IN" or "US"
}
*/
// const objSchema = zod.object({
//     email:zod.string().email(),
//     password:zod.string().min(8),
//     country:zod.literal("IN").or(z.literal("US"))
// })
app.post("/health-checkup",(req,res)=>{
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);
    //this give all the error like success true or false, and expected input and recieved input
    if(!response.success){
        res.status(411).json({
            msg:"input is invalid"
        })
    }
    else{
        res.send({
            response
        })
    }
    
})





app.listen(8080,(err)=>{
    if(err) return err;
    console.log(`http://localhost:8080/`);
})