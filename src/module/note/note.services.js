import Note from "../../database/models/note.model.js"
import User from "../../database/models/user.model.js"

//create note services
export const createNoteServices=async(data)=>{
//body userId

    const user=await User.findByPk(data.userId)
    if(!user)return "userNotFound"

    const note=await Note.create(data)
    return note
}

//get note services
export const getNoteServices=async()=>{
const notes=await Note.findAll({
    include:[
        {
            model:User,
            as:"User",
            attributes:["id","name","email"]
        }
    ],
    order:[["createdAt","Desc"]]
})
    return notes
}

//get note by userId
export const getNoteByUserIdServices=async(userId)=>{
    const user=await User.findByPk(userId)
    if(!user){
        return[]
    }
const notes=await Note.findAll({
    where:{userId},
    include:[
        {
            model:User,
            as:"User",
            attributes:["id","name","email"]
        }
    ],
    order:[["createdAt","Desc"]]
})
    return notes
}

//get note by id
export const getNoteByNoteIdServices=async(id)=>{
const notes=await Note.findOne({
    where:{id},
    include:[
        {
            model:User,
            as:"User",
            attributes:["id","name","email"]
        }
    ]
})
    return notes
}

//soft delete
export const softDeleteNoteServices=async(noteId,userId)=>{
  const note=await Note.findByPk(noteId)
 if(!note){
  return"NotFoundNote"
    }
    if(note.userId!==parseInt(userId)){
     return "notAuthorized"
    }
    await note.destroy()
    return "success"
}

//restore soft deleted note services
export const restoreNoteServices=async(noteId)=>{
  const note=await Note.findOne({
    where:{id:noteId},
    paranoid:false
  })
 if(!note){
  return"NotFoundNote"
    }
if(note.deletedAt===null)return "noteNotDeleted"
await note.restore()
    
    return note
}

//hard delete
export const hardDeleteNoteServices=async(noteId,userId)=>{
  const note=await Note.findOne({
    where:{id:noteId},
    paranoid:false
  })
 if(!note){
  return"NotFoundNote"
    }
    if(note.userId!==parseInt(userId)){
     return "notAuthorized"
    }
    await note.destroy({force:true})
    return "success"
}