
var longitude,latitude,info;
function showPosition() {
    navigator.geolocation.getCurrentPosition(successLocation,errorLocation,{enableHighAccuracy:true});
    
}


function successLocation(position){
    
    longitude=position.coords.longitude;
   
    latitude=position.coords.latitude;

   

}

function errorLocation(){
  
    $.getJSON('https://geolocation-db.com/json/')
         .done (function(location) {
            
            latitude=location.latitude;
             longitude=location.longitude;
           
         });
         
}

function validation(){
   
     var name=document.getElementById('na').value;          
    var user = document.getElementById('user').value;
    var pass = document.getElementById('pass').value;
    var confirmpass = document.getElementById('conpass').value;
    var mobileNumber = document.getElementById('mobileNumber').value;
    var emails = document.getElementById('emails').value;
    // $("#buttonsubmit").attr("disabled", true);

//    if(name=="")
//    {
//     document.getElementById('name').innerHTML =" ** Please fill the name field";
//     return false;
//    }

    if(user == ""){
        document.getElementById('username').innerHTML =" ** Please fill the username field";
        return false;
    }
    if((user.length <= 2) || (user.length > 20)) {
        document.getElementById('username').innerHTML =" ** Username lenght must be between 2 and 20";
        return false;	
    }
    if(!isNaN(user)){
        document.getElementById('username').innerHTML =" ** only characters are allowed";
        return false;
    }
  
    $.post('/userexist',{user:user},function(data){
        
    });
    
   
//     if(pass == ""){
//         document.getElementById('passwords').innerHTML =" ** Please fill the password field";
//         return false;
//     }
//     if((pass.length <= 5) || (pass.length > 20)) {
//         document.getElementById('passwords').innerHTML =" ** Passwords lenght must be between  5 and 20";
//         return false;	
//     }


//     if(pass!=confirmpass){
//         document.getElementById('confrmpass').innerHTML =" ** Password does not match the confirm password";
//         return false;
//     }



//     if(confirmpass == ""){
//         document.getElementById('confrmpass').innerHTML =" ** Please fill the confirmpassword field";
//         return false;
//     }



   
//     if(mobileNumber == ""){
//         document.getElementById('mobileno').innerHTML =" ** Please fill the mobile NUmber field";
//         return false;
//     }
//     if(isNaN(mobileNumber)){
//         document.getElementById('mobileno').innerHTML =" ** user must write digits only not characters";
//         return false;
//     }
//     if(mobileNumber.length<10 || mobileNumber.length>12){
//         document.getElementById('mobileno').innerHTML =" ** Mobile Number must be valid";
//         return false;
//     }
    
    
    



//     if(emails == ""){
//         document.getElementById('emailids').innerHTML =" ** Please fill the email idx` field";
//         return false;
//     }
//     if(emails.indexOf('@') <= 0 ){
//         document.getElementById('emailids').innerHTML =" ** @ Invalid Position";
//         return false;
//     }

//     if((emails.charAt(emails.length-4)!='.') && (emails.charAt(emails.length-3)!='.')){
//         document.getElementById('emailids').innerHTML =" ** . Invalid Position";
//         return false;
//     }
    
//     if(longitude==undefined)
//     {
//         document.getElementById('locate').innerHTML =" ** Plz allow ur location"; 
//         return false;
    
//     }
// var full_number = phone_number.getNumber(intlTelInputUtils.numberFormat.E164);
// $("input[name='phone_number[full]'").val(full_number);
// $.post('/submit_user',{name:name,user:user,password:pass,email:emails,confirm_password:confirmpass,phone:full_number,longitude:longitude,latitude:latitude});  //ye data save ho jayega phir
//yeha pass kr diya jo id se get kiya tha aur sbko ek tag ke sath pass kiya jaise name ko name se full number ko phone isse ye rhega phone se wha get kr lenge easily ok ab aage chlu ha
}



