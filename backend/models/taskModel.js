const mongoose=require("mongoose");

const TaskSchema=new mongoose.Schema({
    title:{type:String, required:true},
    // FormData:{type:Date, required:true},
    // ToData:{type:Date, required:true},
    completed:{type:Boolean, default:false}
});

module.exports=mongoose.model("Task",TaskSchema);