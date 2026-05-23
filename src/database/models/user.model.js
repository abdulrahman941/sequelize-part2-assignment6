import { DataTypes } from "sequelize";
import { sequelize_config } from "../connection.js";
import Note from "./note.model.js";


const User = sequelize_config.define("User",
{
name:{
    type:DataTypes.STRING(30),
    allowNull:false,
    validate:{
        len:[2,30],
        notEmpty:true

    }
},
email:{
    type:DataTypes.STRING(100),
    allowNull:false,
    unique:true,
    validate:{
        isEmail:true


    }
},
password:{
    type:DataTypes.STRING(100),
    allowNull:false,
   validate:{//custon validation
     checkpasswordlength(value){
        if(value.length<6){
            throw new error("password must be greater than 6")
        }
     }
   }
},
role:{
    type:DataTypes.ENUM("user","admin"),
    defaultValue:"user",
    validate:{
    isIn:[["user","admin"]]

    }
},

},{
    timestamps:true,
    paranoid:true
})


export default User



//user has many note
User.hasMany(Note,{
    foreignKey:{name:"userId"},
    ONDELETE:"CASCADE",
    ONUPDATE:"CASCADE",
    as: "Note"

})

//note han one user
Note.belongsTo(User,{
    foreignKey:{name:"userId"},
    ONDELETE:"CASCADE",
    ONUPDATE:"CASCADE",
    as:"User"
})
