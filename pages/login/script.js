function login (username, password) {
    fetch("http://localhost:8080/login", {
        method: 'POST',
        body: JSON.stringify({
          "name": username,
          "password": password
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then((response) => response.text()).then((response) => {
        if (response.startsWith('Error')) {
            alert('The username or password you entered are ivalid. Please try again.');
        } else {
            window.location.href = `http://localhost:8080/`;
        }
    });
}

function submit() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    login(username, password);
}