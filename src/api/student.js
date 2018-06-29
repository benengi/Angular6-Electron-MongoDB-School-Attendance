var express=require('express');
var mongoose=require('mongoose');

var student=require('../schemas/student.schema');

var router = express.Router();

mongoose.connect('mongodb://localhost:27017/school');

router.get('/findstudent/:id',function(req,res,next){
  student.findById({_id:req.params.id})
  .exec(function(err,student){
     if(err){
       return res.status(500).json({
         title:'error occured',
         error:err
       });
     }
res.status(200).json(student);
  });
});


router.put('/edit',function(req,res,next) {
student.findByIdAndUpdate({_id:req.body._id},{"$set": { "name": req.body.name,"fathersname": req.body.fathersname,"mothersname": req.body.mothersname,
"studentid":req.body.studentid, "dateofbirth":req.body.dateofbirth,"gender":req.body.gender, "phonenumber":req.body.phonenumber}})
.exec(function(err,user){
  if(err){
    return res.status(500).json({
      title:'error occured in updating student',
      error:err
    });
  }
  res.status(200).json({
    message:'students  updated',
    obj : user
  });
});
});
router.delete('/:id',function(req,res,next){

  student.findByIdAndRemove({_id:req.params.id})
  .exec(function(err,user){
    if(err){
      return res.status(500).json({
        title:'error occured in deleting student',
        error:err
      });
    }
    res.status(200).json({
      message:'student  deleted',
      obj : user
    });
  });
});

router.post('/signup',function(req,res,next){

    var tstudent=new student({
      _id: new mongoose.Types.ObjectId(),
      'studentid':req.body.studentid,
      'name': req.body.name,
      'fathersname': req.body.fathersname,
      'mothersname': req.body.mothersname,
      'dateofbirth':req.body.dateofbirth,
      'gender':req.body.gender,
      'phonenumber':req.body.phonenumber,
      'classid':null
   });
   
   tstudent.save(function(err,students){
     if(err){
       return res.status(500).json({
         title :'An error occured',
         error:err
       });
      }
    res.status(201).json({
          msg:'student Created',
          obj:students
    });      
    });
   });

   router.get('/findAllStudent',function(req,res,next){
    student.find({})
    .exec(function(err,students){
    
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
res.status(200).json(students);

    });
  });

  module.exports = router;