import express from "express"
import { dbconnection } from "./database/connection.js"
import usercontroller from "./module/user/user.controller.js"
import notecontroller from "./module/note/note.controller.js"

export const bootstrap=async()=>{
const app=express()
const port=3000

app.use(express.json())
dbconnection()


app.use("/users",usercontroller)
app.use("/notes",notecontroller)

app.use((req,res,next)=>{
res.status(404).json({message:"Router not found"})

})
app.get("/",(req,res)=>{
    res.status(200).json({message:"Hello"})

})

app.use((err,req,res,next)=>{     //global err handling
res.status(500).json({
    stack:err.stack,
    message:err.message
})
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    
})
}

//server
//connection to db
//create models
//api=>signup-getuser-getuserbyid
//update user
//soft delete user
//resore
//hard delete
//Note model
