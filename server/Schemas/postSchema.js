const express= require("express")
const mongoose = require("mongoose")
const schema = mongoose.Schema
const postSchema = new schema({
       title:String,
       summary:String,
       content:String,
       cover:String,
       auther : { type: mongoose.Schema.Types.ObjectId, ref: 'newUser' }

})
module.exports = mongoose.model("Post",postSchema)