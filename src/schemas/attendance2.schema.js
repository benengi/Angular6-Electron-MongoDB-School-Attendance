var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    dateofattendance:{type:String},
    details:[{
        type:Schema.Types.ObjectId,
        ref:'detail'
    }],
    status:{type:String}  // holiday / work
    });
    

module.exports = mongoose.model('attendance2',schema);