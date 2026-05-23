import Router from "express"
import * as NoteServices from "./note.services.js"

const notecontroller=Router()
//create note
notecontroller.post("/create",async(req,res)=>{
   try {
    const data=await NoteServices.createNoteServices(req.body)
   if(data=="userNotFound")return res.status(404).json({message:"no user found"})
    return res.status(201).json({message:"user created successfully",data:data})
   } catch (error) {
    return res.status(500).json({message:"Internal server Error",error:error.message})

   }

})

//get all note
notecontroller.get("/get-all-notes",async(req,res)=>{
   try {
    const data=await NoteServices.getNoteServices()
    return res.status(201).json({message:"get all notes successfully",data:data})
   } catch (error) {
    return res.status(500).json({message:"Internal server Error",error:error.message})

   }

})

//get usernoteby userid
notecontroller.get("/users/:userId",async(req,res)=>{
   try {
    const data=await NoteServices.getNoteByUserIdServices(req.params.userTd)
    return res.status(201).json({message:"Notes",data:data})
   } catch (error) {
    return res.status(500).json({message:"Internal server Error",error:error.message})

   }

})

//get usernoteby noteId
notecontroller.get("/:id",async(req,res)=>{
   try {
    const data=await NoteServices.getNoteByNoteIdServices(req.params.id)
    return res.status(201).json({message:"Notes",data:data})
   } catch (error) {
    return res.status(500).json({message:"Internal server Error",error:error.message})

   }

})


//soft delete for note
notecontroller.delete("/:id",async(req,res)=>{
   try {
      const noteId=req.params.id
      const {userId}=req.body
      if(!userId){
      return res.status(400).json({message:"userId is required"})

      }
    const data=await NoteServices.softDeleteNoteServices(noteId,userId)
    if(data=="NotFoundNote")return res.status(404).json({message:"Notes not found"})
    if(data=="notAuthorized")return res.status(403).json({message:"Notes not authrozied"})
      return res.status(201).json({message:"notes soft deleted successfully",data:data})
   } catch (error) {
    return res.status(500).json({message:"Internal server Error",error:error.message})

   }

})


//restore soft delete note services
notecontroller.patch("/restore/:id",async(req,res)=>{
   try {
      const data=await NoteServices.restoreNoteServices(req.params.id)     
     if(data=="NotFoundNote")return res.status(404).json({message:"no notes found"})
     if(data=="noteNotDeleted")return res.status(404).json({message:"note not deleted"})

      return res.status(200).json({message:"note restored successfully",data:data})
              
   } catch (error) {
      return res.status(500).json({message:"Internal server Error"})

   }
})

    export default notecontroller


    //hard delete for note
notecontroller.delete("/hard/:id",async(req,res)=>{
   try {
      const noteId=req.params.id
      const {userId}=req.body
      if(!userId){
      return res.status(400).json({message:"userId is required"})

      }
    const data=await NoteServices.hardDeleteNoteServices(noteId,userId)
    if(data=="NotFoundNote")return res.status(404).json({message:"Notes not found"})
    if(data=="notAuthorized")return res.status(403).json({message:"Notes not authrozied"})
      return res.status(201).json({message:"notes hard deleted successfully",data:data})
   } catch (error) {
    return res.status(500).json({message:"Internal server Error",error:error.message})

   }

})