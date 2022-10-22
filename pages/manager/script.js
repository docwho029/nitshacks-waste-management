function assign(username, id) {
    fetch("http://localhost:8080/assign", {
        method: 'POST',
        body: {
          "name": username,
          "id": id
        } 
    }).then((response) => {
        if (response.startswith("Error")) {
            //Invalid request (not a manager or something)
        } else {
            //Success
        }
    });
}