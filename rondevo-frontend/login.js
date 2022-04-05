    
function login(){
    var uuid = document.getElementById('uuid').value;

    if(uuid == ""){
        alert("Fill with your id to proceed.");
    }else{ 
              
        var data = {
            uuid: uuid,
        };

        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(data),
            };

        fetch('http://localhost/rondevo/public/login/check', options)
        .then(res =>res.json()).then(res => {
            if(res == "true"){
                window.localStorage.setItem('uuid', uuid);
                window.location.href = "./home.html";
            }else{
                alert("This uuid doesn't exist, try again.");
            }
            // console.log(res);
        })
    }
}