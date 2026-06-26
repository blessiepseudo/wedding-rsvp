const API =
"https://script.google.com/macros/s/AKfycbwpa9vobsrnv87gOmywYG_jG2_BSZuJvoG-PxZdXrmaXTXJJa9iULzcNy2b5MbUFgsx/exec";

let selectedSeats=0;


function searchGuest(){

let query =
document.getElementById("name").value;


if(query.length < 2){
return;
}


fetch(API,{

method:"POST",

body:JSON.stringify({

action:"search",
query:query

})

})


.then(r=>r.json())

.then(data=>{


let box =
document.getElementById("suggestions");


box.innerHTML="";


data.forEach(g=>{


let div =
document.createElement("div");


div.className="suggestion";


div.innerHTML=g.name;


div.onclick=function(){

selectGuest(g);

};


box.appendChild(div);


});


});


}



function selectGuest(g){


document.getElementById("name").value=g.name;


selectedSeats=g.seats;


document.getElementById("guestInfo")
.innerHTML =
"Reserved Seats: "+g.seats;


document.getElementById("suggestions")
.innerHTML="";


}



function submitRSVP(){


let name =
document.getElementById("name").value;


let rsvp =
document.getElementById("rsvp").value;


let requests =
document.getElementById("requests").value;



if(!name || !rsvp){

alert("Complete the form");

return;

}



fetch(API,{

method:"POST",

body:JSON.stringify({

action:"submit",

name:name,

rsvp:rsvp,

seats:selectedSeats,

requests:requests

})

})


.then(r=>r.json())

.then(result=>{


if(result.status==="duplicate"){

document.getElementById("message")
.innerHTML =
"Already submitted.";

}

else{

document.getElementById("message")
.innerHTML =
"Thank you! RSVP saved.";

}


});


}
