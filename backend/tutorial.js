const express = require("express");
const app = express();
// console.dir(app);
const port  = 3000
app.listen(port,()=>
{
    console.log(`Welcome to ExpressJs - ${port}`)
})
app.get("/",(req,res)=>
{
    console.log("Root path");
})
app.get("/apple",(req,res)=>
{
    console.log("Apple path");
})
app.get("/orange",(req,res)=>
{
    console.log("Orange path");
})
app.get("*",(req,res)=>
{
    console.log("Invalid path");
})
app.post("/",(req,res)=>
{
    console.log("Post root path");
})
// app.use((req,res)=>
// {
//     // console.log(req);
//     console.log("Request Recieved");
//     res.send("This is Response");
// })