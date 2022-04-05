//*must be logged in first------------------------

var idex = window.localStorage.getItem("uuid");
if (idex == "null") {
  window.location.href = "./login.html";
}

//*get available slots----------------------------

var uuid = document.querySelector(".uuid");
uuid.textContent += window.localStorage.getItem("uuid");
var uuid_local = window.localStorage.getItem("uuid");
var available = document.getElementById("available");
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

function getavailable() {
  var date = document.getElementById("date").value;
    // available.innerHTML = ""; //?notworking

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
            available.innerHTML = `<h3>NOT FOUND</h3>`;
        }
        available_slots.forEach((slot) => {
          available.innerHTML += `
            <div>
            <p>${slot}</p>
            <button class="btn btn-primary mx-3" data-uuid="${uuid_local}" data-slot="${slot}" data-date="${date}" onclick="reserve(this)">reserve</button>
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
