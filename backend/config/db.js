const mongoose=require("mongoose");

module.exports=async function connectDB(url) {
    
    mongoose.set('strictQuery', true);
    await mongoose.connect(url);
    console.log("MongoDB connected");
    
}