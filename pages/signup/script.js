function signup (username, password, type) {
    fetch("http://localhost:8080/signup", {
        method: 'POST',
        body: {
          "name": username,
          "password": password,
          "type": type
        } 
    }).then((response) => {
        if (response.startswith('Error')) {
            //code for scenario in which user already exists
        } else {
            //code if user successfully created
        }
    });
}