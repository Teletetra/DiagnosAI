const { response } = require('express');
const mongoose=require('mongoose');

const chatSchema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",
    required:true
  },
  prompt:{
    type:String,
    required:true
  },
  response:{
    type:String,
    required:true
  }
},{timestamps:true})

module.exports=mongoose.model("Chat",chatSchema);
