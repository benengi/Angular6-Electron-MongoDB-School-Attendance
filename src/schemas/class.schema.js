var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    students:[{
        type:Schema.Types.ObjectId,
        ref:'student'
    }],
    standard:{type:Number},
    section:{type:String},
    year:{type:Number},
    staff:{
        type:Schema.Types.ObjectId,
        ref:'user'
        }
    });

module.exports = mongoose.model('class',schema);