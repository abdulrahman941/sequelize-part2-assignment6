import Router from"express"
import { RegistrationServices } from "./user.services.js"
import *as userServices from "./user.services.js"

const usercontroller=Router()


usercontroller.post("/signup",async(req,res)=>{
   try {
      const data=await userServices.RegistrationServices(req.body)
     if(data=="userExists")return res.status(409).json({message:"email aready exist"})
        return res.status(201).json({message:"user created successfully",data:data})
   } catch (error) {
      return res.status(500).json({message:"Internal server Error"})

   }
})

usercontroller.get("/all-users",async(req,res)=>{
   try {
      const data=await userServices.ListAllUsersServices()      
     if(data=="NotFoundUsers")return res.status(409).json({message:"no users found"})
        return res.status(200).json({message:"users",data:data})
              
   } catch (error) {
      return res.status(500).json({message:"Internal server Error"})

   }
})

usercontroller.get("/:id",async(req,res)=>{
   try {
      const data=await userServices.GetUserByIdServices(req.params.id)     
     if(data=="NotFoundUser")return res.status(409).json({message:"no users found"})
        return res.status(200).json({message:"user",data:data})
              
   } catch (error) {
      return res.status(500).json({message:"Internal server Error"})

   }
})

usercontroller.put("/update-user/:id",async(req,res)=>{
   try {
      const data=await userServices.UpdateUserServices(req.params.id,req.body)     
     if(data=="userNotFound")return res.status(404).json({message:"no users found"})
     if(data=="EmailExists")return res.status(409).json({message:"Email already exists"})

        return res.status(200).json({message:"updated user",data:data})
              
   } catch (error) {
      return res.status(500).json({message:"Internal server Error",error})

   }
})
//soft delete
usercontroller.delete("/:id",async(req,res)=>{
   try {
      const data=await userServices.softDeleteUserServices(req.params.id)     
     if(data=="NotFoundUser")return res.status(409).json({message:"no users found"})
        return res.status(200).json({message:"user soft deleted successfully",data:data})
              
   } catch (error) {
      return res.status(500).json({message:"Internal server Error"})

   }
})

//restore soft delete
usercontroller.patch("/restore/:id",async(req,res)=>{
   try {
      const data=await userServices.restoreUserServices(req.params.id)     
     if(data=="NotFoundUser")return res.status(404).json({message:"no users found"})
     if(data=="userNotDeleted")return res.status(404).json({message:"user not deleted"})

      return res.status(200).json({message:"user restored successfully",data:data})
              
   } catch (error) {
      return res.status(500).json({message:"Internal server Error"})

   }
})
//hard delete
usercontroller.delete("/hard/:id",async(req,res)=>{
   try {
      const data=await userServices.hardDeleteUserServices(req.params.id)     
     if(data=="NotFoundUser")return res.status(409).json({message:"no users found"})
        return res.status(200).json({message:"user deleted successfully",data:data})
              
   } catch (error) {
      return res.status(500).json({message:"Internal server Error"})

   }
})





















export default usercontroller