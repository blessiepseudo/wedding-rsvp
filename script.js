const API =
"https://script.google.com/macros/s/AKfycbwpa9vobsrnv87gOmywYG_jG2_BSZuJvoG-PxZdXrmaXTXJJa9iULzcNy2b5MbUFgsx/exec";


let selectedSeats = 0;
let guestSelected = false;



function searchGuest(){


let query =
document.getElementById("name").value.trim();


guestSelected = false;
document.getElementById("selectedGuest").value="";


let box =
document.getElementById("suggestions");


box.innerHTML="";


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


data.forEach(g=>{


let div =
document.createElement("div");


div.className="suggestion";


div.innerHTML =
g.name;



div.onclick=function(){


selectGuest(g);


};



box.appendChild(div);


});


});


}





function selectGuest(g){


document.getElementById("name").value =
g.name;


document.getElementById("selectedGuest").value =
g.name;


selectedSeats =
g.seats;


guestSelected = true;



document.getElementById("guestInfo")
.innerHTML =
"Reserved Seats: "+g.seats;


document.getElementById("suggestions")
.innerHTML="";


}






function submitRSVP(){


if(!guestSelected){


alert(
"Please select your name from the guest list."
);


return;


}



let name =
document.getElementById("selectedGuest").value;


let rsvp =
document.getElementById("rsvp").value;


let requests =
document.getElementById("requests").value;



if(!rsvp){

alert("Please select RSVP status");

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
"RSVP already submitted.";


}

else{


document.getElementById("message")
.innerHTML =
"Thank you! RSVP saved.";


}



});


}
