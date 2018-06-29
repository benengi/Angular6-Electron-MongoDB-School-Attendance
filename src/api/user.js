var express=require('express');
var mongoose=require('mongoose');
var bcrypt = require('bcryptjs');
//svar testSchema=require('../schemas/test.schema');

var user=require('../schemas/user.schema');

var router = express.Router();

mongoose.connect('mongodb://localhost:27017/school');


router.put('/edit',function(req,res,next){

    user.findByIdAndUpdate({_id:req.body._id},{"$set": { "name": req.body.name ,"staffid":req.body.staffid, "dateofbirth":req.body.dateofbirth,"gender":req.body.gender,"email":req.body.email, "phonenumber":req.body.phonenumber}})
    .exec(function(err,user){
      if(err){
        return res.status(500).json({
          title:'error occured in updating user',
          error:err
        });
      }
      res.status(200).json({
        message:'user  updated',
        obj : user
      });
    });
  });
  
  router.put('/editpass',function(req,res,next){

    user.findByIdAndUpdate({_id:req.body._id},{"$set": { "password":bcrypt.hashSync(req.body.password,10) }})
    .exec(function(err,user){
      if(err){
        return res.status(500).json({
          title:'error occured in updating user',
          error:err
        });
      }
      res.status(200).json({
        message:'user  updated',
        obj : user
      });
    });
  });

router.delete('/:id',function(req,res,next){

  user.findByIdAndRemove({_id:req.params.id})
  .exec(function(err,user){
    if(err){
      return res.status(500).json({
        title:'error occured in deleting user',
        error:err
      });
    }
    res.status(200).json({
      message:'user  deleted',
      obj : user
    });
  });
});

router.post('/signup',function(req,res,next){

 var tuser=new user({
   _id: new mongoose.Types.ObjectId(),
   'staffid':req.body.staffid,
   'password': bcrypt.hashSync(req.body.password,10),
   'name': req.body.name,
   'dateofbirth':req.body.dateofbirth,
   'gender':req.body.gender,
   'email':req.body.email,
   'phonenumber':req.body.phonenumber
});

tuser.save(function(err,users){
  if(err){
    return res.status(500).json({
      title :'An error occured',
      error:err
    });
   }
 res.status(201).json({
       msg:'User Created',
       obj:users
 });      
 });
});

router.post('/signin',function(req,res,next){
  user.findOne({staffid:req.body.staffid},function(err,user){
  if(err){
    return res.status(500).json({
        title:'An error occured',
        error:err
    });
  }
  if(!user){
    return res.status(500).json({
        title:'Login Failed',
        error:{ messages:'Invalid user'}
    });
  }
  
  if(!bcrypt.compareSync(req.body.password,user.password)){
    return res.status(401).json({
      title:'Login Failed',
      error:{ messages:'Invalid password' }
  });
  }
  
  //var token = jswt.sign({user:user},'secret',{expiresIn:7200});
  res.status(200).json({
      messages:'successfully logged in',
    //  token:token,
      userId:user.staffid
  });
  });
  });

  

  router.get('/findAllFaculty',function(req,res,next){
    user.find({})
    .exec(function(err,users){
    
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
res.status(200).json(users);

    });
  });

  
module.exports = router;