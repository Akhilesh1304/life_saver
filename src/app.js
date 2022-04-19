const express=require("express");
const bodyParser=require("body-parser");
const twilio=require("twilio");
const app=express();
var mongoose = require('mongoose');
const path=require("path");
const { MobileInstance } = require("twilio/lib/rest/api/v2010/account/availablePhoneNumber/mobile");
const { VariablePage } = require("twilio/lib/rest/serverless/v1/service/environment/variable");
mongoose.connect('mongodb://localhost/life_saver', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:false}))
const  staticPath=path.join(__dirname,"../public")
app.use(express.static(staticPath));  


app.listen(80,(req,res)=>{
   console.log("at port 80");
});

app.get("/signup",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/signup.html"));
});


const userSchema = new mongoose.Schema({
    name: String,
    user:String,
    phone: String,
    email:String,
    password:String,
    confirm_password:String,
    longitude:Number,
    latitude:Number
   
  });
  

  var userinfo = mongoose.model('userinfo', userSchema);

  app.post('/submit_user',async(req,res)=>{
     try{
       
        const user= new userinfo({
          name:req.body.name,
          user:req.body.user,
          phone:req.body.phone,  
          email:req.body.email,
          password:req.body.password,
          confirm_password:req.body.confirm_password,
          longitude:req.body.longitude,
          latitude:req.body.latitude,
         
        });
       
        const userdata=await user.save();
        res.status(200).send("submit successfully.");

     }
     catch(err){
      
     }
  });





  app.get('/sign_in', (req, res) => {
   res.sendFile(path.join(__dirname,"../public/sign_in.html"));
});


  app.post('/main',async(req,res)=>{
   try{
       
      
        const username=req.body.username;
        const password=req.body.password;
        const userData=await userinfo.findOne({user:username});
        
        if(userData.password==password)
        {  
            res.sendFile(path.join(__dirname,"../public/index.html"));
        }
        else
        res.send("invalid username or password");
   }
   catch(err){
       res.status(404).send("error");
   }
   
  
});




 app.get('/index', (req, res) => {
     res.sendFile(path.join(__dirname,"../public/index.html"));
 });



 
app.post('/datamap',async(req,res)=>{  
   try{
    var mapdata=await userinfo.find();
    res.send(mapdata);
   }
   catch(err){
      res.status(404).send("error");
   }
    
});





var accountSid ='AC99a3b31d6d62467f0ddfa08f3aab3c73';
var authToken ='8ecfa07a8af9ba2a9209e60abcc3c4f2';
var client = new twilio(accountSid, authToken);

app.post('/msg',async(req,res)=>{
   try{
      token=req.body.token,
    mobn=req.body.mobn,
     tokens="/"+token+"/";
    client.messages.create({
    body: ` pllz cheak this link here is an emergency  http://192.168.43.59/acc_pos   and your token no. is: ${tokens}`,  
    to:mobn,  // Text this number
    from: '+12253074265' 
})
.then((message) => console.log(message.sid));   
   }
   catch(err){
       res.status(404).send('error');
   }
});

app.post('/submit',async(req,res)=>{
   try{
       user=req.body.user;
        var userdata=await userinfo.find();
        var a='0';
        userdata.forEach(element => {
          if(user==element.user)
          {
             a='1';
          }
        });
        if(a=='0')
        {
            res.sendFile(path.join(__dirname,"../public/index.html"));
        }
        else
        res.send("username already exist");  
       
   }
   catch(err)
   {
       res.status(404).send("error");
   }
});

app.get('/acc_pos',async(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/acc_pos.html"));

 });


 
const helperSchema = new mongoose.Schema({ 
   longitude:Number,
   latitude:Number,
   token: String,
     schedule: [{ }] 
 
 
 });
 
 var helperinfo = mongoose.model('helperinfo', helperSchema);

 
 
 app.post('/submit_helper',async(req,res)=>{
   try{
      var data=req.body.schedule;
      datauser=JSON.parse(data);
      console.log(datauser);
      const user= new helperinfo({
        
        longitude:req.body.longitude,
        latitude:req.body.latitude,
        token:req.body.token,
        schedule:datauser

       
      }); 
     
      const userdata=await user.save();
      res.status(200).send("submit successfully.");

   }
   catch(err){   
    
   }
 });




app.post('/accept_msg',async(req,res)=>{
   try{
      phone_no=req.body.phone_no,
      mobn=req.body.mobn,
      token=req.body.token,  
      client.messages.create({ 
         body: `an emergency that token no. is ${token}  accepted by a person and contact no. is ${phone_no} ha okh happy hihihi  `,  
         to:mobn,  // Text this number
         from: '+12253074265' 
     })
     .then((message) => console.log(message.sid));  

   }
   catch(err){
     res.status(404).send("error");
   }
})
app.post('/tokeninfo',async(req,res)=>{  
   try{
    var tokendata=await  helperinfo.find();
    res.send(tokendata);  
   }
   catch(err){
      res.status(404).send("error");
   }''
    
});
