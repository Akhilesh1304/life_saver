mapboxgl.accessToken = 'pk.eyJ1IjoiYndhZGFtc29uIiwiYSI6ImNqajZhNm1idDFzMjIza3A2Y3ZmdDV6YWYifQ.9NhptR7a9D0hzWXR51y_9w';
var token,messege_data;
var longitude,latitude;
    navigator.geolocation.getCurrentPosition(successLocation,errorLocation,{enableHighAccuracy:true});
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
//  import{longitude,latitude}from './dis.js';
var latitude_dest;
var longitude_dest;     



function get_position(){
  token=document.getElementById('token_get').value; 
  console.log(token);
    $.post('/tokeninfo',function(data){
      
          data.forEach(element => {
              if(token==element.token){
                longitude_dest=element.longitude;
                latitude_dest=element.latitude;
               messege_data=element;
              }
          
          });
    })     
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [80,20],
    zoom: 5
  });
  map.on('load', function() {
    var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken
    });
    map.addControl(directions, 'top-left');
  
    directions.setOrigin([longitude,latitude]);
    directions.setDestination([longitude_dest,latitude_dest]);
  });
  

}

function help(){
  var user=document.getElementById('msg').value;
  var phone_no; 
  var data=messege_data.schedule;
  data.forEach(element=>{
     if(element.username_p==user){
     phone_no=element.mobn;
     
     }
  
  });
  data.forEach(element=>{
  if(element.username_p!=user) 
  console.log(phone_no);
  $.post('/accept_msg',{phone_no:phone_no,mobn:element.mobn,token:token}); 
})
}

