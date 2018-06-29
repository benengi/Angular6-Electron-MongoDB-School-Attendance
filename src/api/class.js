var express=require('express');
var mongoose=require('mongoose');

var Class = require('../schemas/class.schema');
var student=require('../schemas/student.schema');

var router = express.Router();

mongoose.connect('mongodb://localhost:27017/school');



router.get('/findClass/:id',function(req,res,next){
  Class.findById({_id:req.params.id})
  .exec(function(err,classes){
     if(err){
       return res.status(500).json({
         title:'error occured',
         error:err
       });
     }
res.status(200).json(classes);

  });
});


router.get('/getStudents/:id',function(req,res,next){
  Class.findById({_id:req.params.id}).populate('students')
  .exec(function(err,classes){
     if(err){
       return res.status(500).json({
         title:'error occured',
         error:err
       });
     }
res.status(200).json(classes);

  });
});


router.put('/removeStudent/:id',function(req,res,next){

  Class.findByIdAndUpdate({_id:req.params.id} , { $pull: { students: req.body._id } })
  .exec(function(err,user){
    if(err){
      return res.status(500).json({
        title:'error occured in deleting class',
        error:err
      });
    }
    res.status(200).json({
      message:'student  Removed',
      obj : user
    });
  });
});


router.put('/addStudent',function(req,res,next) {
 Class.findByIdAndUpdate({_id:req.body.classid},{$push:{students:req.body.studentid}})
  .exec(function(err,data){
    if(err){
      return res.status(500).json({
        title:'error occured in updating student',
        error:err
      });
    }
    res.status(200).json({
      message:'students  updated',
      obj : data
    });
  });
  });



router.delete('/:id',function(req,res,next){

  Class.findByIdAndRemove({_id:req.params.id})
  .exec(function(err,user){
    if(err){
      return res.status(500).json({
        title:'error occured in deleting class',
        error:err
      });
    }
    res.status(200).json({
      message:'class  deleted',
      obj : user
    });
  });
});


router.post('/signup',function(req,res,next){

    var tclass=new Class({
      _id: new mongoose.Types.ObjectId(),
      'students': [],
      'standard':req.body.standard,
      'section':req.body.section,
      'staff': null,
      'year':req.body.year
   });
   
   tclass.save(function(err,classes){
     if(err){
       return res.status(500).json({
         title :'An error occured',
         error:err
       });
      }
    res.status(201).json({
          msg:'Class Created',
          obj:classes
    });      
    });
   });

   router.get('/findAllClass',function(req,res,next){
    Class.find({})
    .exec(function(err,classes){
    
       if(err){
         return res.status(500).json({
           title:'error occured',
           error:err
         });
       }
       /*
    res.status(200).json({
         message:'success',
         obj : users
       });
*/
res.status(200).json(classes);

    });
  });

  
module.exports = router;