var uuid = document.querySelector(".uuid");
// var popup = document.querySelector(".pop-up");

function register(){
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var bdate = document.getElementById('bdate').value;
 
    if(fname == "" || lname == "" || bdate == ""){
        alert("Oops you missed a field !");
    }else{        
        // popup.setAttribute('id', 'success')

        var data = {
            fname: fname,
            lname: lname,
            bdate: bdate
        };

        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(data),
            };

        fetch('http://localhost/rondevo/public/registration/register', options)
        .then(res =>res.json()).then(res => {
            uuid.textContent += (res.toString());
            uuid.textContent += ('"');
            window.localStorage.setItem('uuid', res.toString());
            // console.log(window.localStorage.getItem('uuid'));
        })
    }

   
}
