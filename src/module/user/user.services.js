import { Op } from "sequelize"
import User from "../../database/models/user.model.js"


export const RegistrationServices=async(data)=>{
    //logic
const isEmailExists=await User.findOne({
    where:{email:data.email}
})
if(isEmailExists){
    return "userExists"
}
let user=await User.create(data)
delete user.dataValues.password
return user

}

export const ListAllUsersServices=async(data)=>{
  const users=await User.findAll({
    attributes:{exclude:["password","createdAt"]},
    order:[["id","Desc"]]
   
  })
 if(!users){
  return"NotFoundUsers"
    }
    return users
}
export const GetUserByIdServices=async(userId)=>{
  const user=await User.findOne({
    where:{id:userId},
    attributes:{exclude:["password"]}

  })
 if(!user){
  return"NotFoundUser"
    }
    return user
}
export const UpdateUserServices=async(userId,data)=>{
let user=await User.findByPk(userId)
return user
if(!user){
    return "userNotFound"
}
if(data.email &&data.email !==user.email){
  let isEmailExists=await User.findOne({
    where:{
      email:data.email,
      id:{[Op.ne]:userId  }
    }

  })
    if(!isEmailExists)return "EmailExists"

}

const updateuser=await User.update(data,{where:{id:userId}})
return updateuser
}
//soft delete
export const softDeleteUserServices=async(userId)=>{
  const user=await User.findByPk(userId)
 if(!user){
  return"NotFoundUser"
    }
    await user.destroy()
    return user
}
//restore soft deleted user services
export const restoreUserServices=async(userId)=>{
  const user=await User.findOne({
    where:{id:userId},
    paranoid:false
  })
 if(!user){
  return"NotFoundUser"
    }
if(user.deletedAt===null)return "userNotDeleted"
await user.restore()
    
    return user
}
//hard delete
export const hardDeleteUserServices=async(userId)=>{
const user=await User.findOne({
    where:{id:userId},
    paranoid:false
  })
  if(!user){
  return"NotFoundUser"
    }
    await user.destroy({force:true})
    return user
}