//*must be logged in first------------------------

var idex = window.localStorage.getItem("uuid");
if (idex == "null") {
  window.location.href = "./login.html";
}  

//*get elements names----------------------------

var uuid = document.querySelector(".uuid");
var reservations = document.getElementById('reservations');
var available = document.getElementById('available');

uuid.textContent += window.localStorage.getItem("uuid");
var uuid_local = window.localStorage.getItem("uuid");
const slots = [
  "9h - 10h",
  "10h - 11h",
  "11h - 12h",
  "14h - 15h",
  "15h - 16h",
  "16h - 17h",
];  
var unavailable_slots = [];
var available_slots = [];


//*------------------------------------------------
function getavailable() {

available_slots = [];

  document.getElementById('available').innerHTML ='';

  var date = document.getElementById("date").value;
  


  if (date == "") {
    alert("date needed !");
  } else {
    var data = {
      date: date,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };  

    fetch(
      "http://localhost/rondevo/public/reservation/displaydayslots",
      options
    )  
      .then((res) => res.json())
      .then((res) => {
        unavailable_slots = Object.values(res);
        slots.forEach((slot) => {
          if (!unavailable_slots.includes(slot)) {
            available_slots.push(slot);
          }  
        });  
        if(available_slots.length == 0){
            available.innerHTML = `<h3>Unfortunately the day you choosed is full</h3>`;
        }    

        available_slots.forEach((slot) => {
          available.innerHTML += `
            <div class="bg-light mx-4 py-3 rounded">
            <p style="font-weight: bold;" class="d-flex justify-content-center align-items-center">${slot}</p>
            <button style="font-weight: 500; background-color: rgb(117, 218, 169);" class="btn mx-3" data-uuid="${uuid_local}" data-slot="${slot}" data-date="${date}" onclick="reserve(this)">reserve</button>
           </div>`; 
        });
      });  
  }    
}  

function logout() {
  window.localStorage.setItem("uuid", null);
  window.location.href = "./login.html";
}  

function reserve(el) {
  var uuid = el.dataset.uuid;
  var slot = el.dataset.slot;
  var date = el.dataset.date;

  var data = {
    uuid: uuid,
    slot: slot,
    date: date,
  };  

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };  

  fetch("http://localhost/rondevo/public/reservation/reserve",
   options).then(window.location.href = "./home.html")
}   

function cancel(el){
  var id = el.dataset.id;

  var data = {
    id: id,
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };  

  fetch("http://localhost/rondevo/public/reservation/cancel",
   options)
  //  showreservations();
}

//*--------------show reservations--------------

function showreservations(){
  var data = {
    uuid : uuid_local,
  }
  
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  
  fetch(
    "http://localhost/rondevo/public/reservation/getuserreservation",
    options
  )
    .then((res) => res.json())
    .then((res) => res.forEach((object)=> {
  
    reservations.innerHTML += `
    <div class="row col-lg-4 rounded-3 bg-light p-3 mb-5">
    <div class="col p-2 d-flex flex-column align-items-center">
      <h2 class='fs-5'>date</h2>
      <div>${object.date}</div>
    </div>
    <div class="col p-2 d-flex flex-column align-items-center">
      <h2 class='fs-5'>hour</h2>
      <div>${object.slot}</div>
    </div>
    <button class="btn mt-3" style="background-color: rgb(247, 118, 118);" data-id="${object.id}" onclick="cancel(this)">cancel</button>
  </div>`;
  
    }))
}
showreservations();

