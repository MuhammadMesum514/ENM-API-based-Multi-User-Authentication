const {Schema,Model} = require('mongoose');

const UserSchema=Model.schema({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
},
},{timestamps:true})