
var longitude_acc,latitude_acc;

 

    function message(){

            navigator.geolocation.getCurrentPosition(successLocation,errorLocation,{enableHighAccuracy:true});

        function successLocation(position){
            
            longitude_acc=position.coords.longitude;
           
            latitude_acc=position.coords.latitude;
       
         
        }
        function errorLocation(){
          
            $.getJSON('https://geolocation-db.com/json/')
                 .done (function(location) {
                    
                    latitude_acc=location.latitude;
                    longitude_acc=location.longitude;
                   
                 });
              
        }
      
               
    var datauser=[];
    $.post( "/datamap", function(data){  
      
      // console.log(longitude_acc);
        var currentdate = new Date(); 
        var token = currentdate.getDate() +""
                + (currentdate.getMonth()+1)  + "" 
                + currentdate.getFullYear() + ""  
                + currentdate.getHours() + ""  
                + currentdate.getMinutes() + "" 
                + currentdate.getSeconds()+""+longitude_acc+""+latitude_acc;
            
             var tokens=token.toString();
             tokens = tokens.replace(/\./g,'0')
           // console.log(tokens)
        data.forEach(element => {
       //   console.log(longitude_acc);
            longi=element.longitude;
            lati=element.latitude;
           var mobn=element.phone;
           var username_p=element.user;
            var d=google.maps.geometry.spherical.computeDistanceBetween(
             new google.maps.LatLng(lati, longi), new google.maps.LatLng(latitude_acc, longitude_acc)); 
             d=d/1000;   
             if(d<=20  ){
               
               datauser.push({username_p,mobn}); 
           //  $.post('/msg',{mobn:mobn,token:tokens});
             
             }
           

        })

    var data=JSON.stringify(datauser);
        console.log(data);
        $.post('/submit_helper',{longitude:longitude_acc,latitude:latitude_acc,token:tokens,schedule:data});
       
   });
   
}




