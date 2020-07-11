const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema=mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String , required:true},
    username:{type:String , required:true,unique:true},
    passworld:{type:String ,required:true}
});

userSchema.plugin(uniqueValidator);

module.exports=mongoose.model('user',userSchema);