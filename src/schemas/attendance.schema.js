var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    dateofattendance:{type:Date},
    classid:{
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
        ref:'student'
    }]
    });

module.exports = mongoose.model('attendance',schema);