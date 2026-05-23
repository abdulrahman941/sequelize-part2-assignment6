import { Sequelize } from "sequelize";



// Option 3: Passing parameters separately (other dialects)
export const sequelize_config = new Sequelize("assignment5_sequelize","root","root", {
  host: 'localhost',
  dialect:"mysql"
});

export const dbconnection=async()=>{
   try {
    await sequelize_config.authenticate({alter:true})
    await sequelize_config.sync()
    console.log("database connected");
   } catch (error) {
    console.error(error);
    
   }
    
}
