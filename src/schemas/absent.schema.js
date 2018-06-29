var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    student:{
        type:Schema.Types.ObjectId,
        ref:'student'
    },
    reason:{type: String}      
    });

module.exports = mongoose.model('absent',schema);
