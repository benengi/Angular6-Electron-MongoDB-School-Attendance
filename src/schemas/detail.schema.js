
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    class:{
        type:Schema.Types.ObjectId,
        ref:'class'
    },
    staffid:{
        type:Schema.Types.ObjectId,
        ref:'user'
        },
    session:{type:String},
    absent:[{
        type:Schema.Types.ObjectId,
        ref:'absent'
        }] 
    });

module.exports = mongoose.model('detail',schema);
