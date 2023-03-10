const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    Variety:{
        type:String,
        require:true
    },
    Type:{
        type:String,
        require:true
    },
    Unit:{
        type:String,
        require:true
    },
    Quantity:{
        type:String,
        require:true
    },
    Price:{
        type:String,
        require:true
    }
})
schema.set("timestamps",true)
module.exports=mongoose.model("view",schema)