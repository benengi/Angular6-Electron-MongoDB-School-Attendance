var express=require('express');
var mongoose=require('mongoose');
var testSchema=require('../schemas/test.schema');
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/school');



router.get('/test/findall',function(req,res,next){

const testData=new testSchema({name:'viswa'});

testData.save()
.then(()=>{
  testSchema.find()
     .exec(function(err,tests){
        if(err){
          return res.status(500).json({
            title:'error occured',
            error:err
          });
        }
        res.status(200).json({
          message:'success',
          obj : tests
        });
        
     });
});
});
module.exports = router;