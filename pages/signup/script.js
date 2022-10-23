const { response } = require("express");

function signup (username, password, type) {
    fetch("http://localhost:8080/signup", {
        method: 'POST',
        body: JSON.stringify({
            name: username,
            password: password,
            type: type
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then((response) => response.text()).then(response => {
        if (response.startsWith('Error')) {
            alert('The username is already taken. Please try another one.');
        } else {
            window.location.href = `http://localhost:8080/${type}`;
        }
    });
}

function submit() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var type = document.getElementById("accs").value;
    
    signup(username, password, type);
}