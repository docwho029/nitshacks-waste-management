function login (username, password) {
    fetch("http://localhost:8080/login", {
        method: 'POST',
        body: {
          "name": username,
          "password": password
        } 
    }).then((response) => {
        if (response.startswith('Error')) {
            //code for invalid password or invalid user
        } else {
            //code if user successfully created
        }
    });
}