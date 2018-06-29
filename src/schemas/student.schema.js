var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    studentid:{type:Number},
    name : {type:String},
    fathersname:{type:String},
    mothersname:{type:String},
    dateofbirth:{type:Date},
    gender:{type:String},
    phonenumber:{type:String},
    classid:{
        type:Schema.Types.ObjectId,
        ref:'class'
        }
    });

module.exports = mongoose.model('student',schema);