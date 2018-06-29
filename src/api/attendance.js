var express=require('express');
var mongoose=require('mongoose');

var router = express.Router();

mongoose.connect('mongodb://localhost:27017/school');

var attendance = require('../schemas/attendance2.schema');
var detail = require('../schemas/detail.schema');
var absent = require('../schemas/absent.schema');


router.get('/getreport/:dt',function(req,res,next){
  attendance.findOne({dateofattendance: req.params.dt}).populate({
    path:'details',
    model:'detail',
    populate:[{
      path:'class',
      model:'class'
    },
    {
      path:'absent',
      model:'absent',
      populate:{
        path: 'student',
        model:'student'
      }
  }]
  })
  .exec(function(err,att){
     if(err){
       return res.status(500).json({
         title:'error occured',
         error:err
       });
     }
res.status(200).json(att);
  });
});



router.put('/insertdetail',function(req,res,next) {
  attendance.findByIdAndUpdate({_id:req.body.attid},{$push:{details:req.body.detid}})
   .exec(function(err,data){
     if(err){
       return res.status(500).json({
         title:'error occured in inserting detail',
         error:err
       });
     }
     res.status(200).json({
       message:'Detials Inserted',
       obj : data
     });
   });
   });

router.get('/viewattendance/:dt',function(req,res,next){
  attendance.findOne({dateofattendance: req.params.dt}).populate({
    path:'details',
    model:'detail',
    populate: {
      path:'absent',
      model:'absent'
    }
  })
  .exec(function(err,att){
     if(err){
       return res.status(500).json({
         title:'error occured',
         error:err
       });
     }
res.status(200).json(att);
  });
});



 router.post('/putattendance',function(req,res,next){

    var tattendance=new attendance({
      _id: new mongoose.Types.ObjectId(),
      dateofattendance:req.body.dateofattendance,
      details:req.body.details,
      status:'work'
   });
   
   tattendance.save(function(err,atts){
     if(err){
       return res.status(500).json({
         title :'An error occured',
         error:err
       });
      }
    res.status(201).json({
          msg:'Attendance Inserted',
          obj:atts
    });      
    });
   });

   router.post('/putdetail',function(req,res,next){

    let absids = [];

    for(let abs of req.body.absent) {
      const rec = new absent({
        _id:new mongoose.Types.ObjectId(),
        student:abs.student,
        reason:abs.reason
      }); 
      rec.save();
absids.push(rec._id);
    }
    var details=new detail({
     _id: new mongoose.Types.ObjectId(),
     class:req.body.class,
     staffid:req.body.staffid,
     absent:absids,
     session:req.body.session
   });
   
  details.save(function(err,det){
     if(err){
       return res.status(500).json({
         title :'An error occured',
         error:err
       });
      }
    res.status(201).json({
          msg:'Attendance Inserted',
          obj:det
    });      
    });
   });

   router.post('/createattendance',function(req,res,next){

    var tattendance=new attendance({
      _id: new mongoose.Types.ObjectId(),
      dateofattendance:req.body.dateofattendance,
      details:[],
      status:req.body.status
   });
   
   tattendance.save(function(err,atts){
     if(err){
       return res.status(500).json({
         title :'An error occured',
         error:err
       });
      }
    res.status(201).json({
          msg:'Attendance Inserted',
          obj:atts
    });      
    });
   });

module.exports = router;