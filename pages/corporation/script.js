function getAssignedEntries (username) {
    fetch("http://localhost:8080/data", {
        method: 'POST',
        body: {
          "name": username
        } 
    }).then((response) => response.json()).then((data) => {
        var myEntries = data.assignedEntries;
        for (let i = 0; i < assignedEntries.length; i++) {
            //Do whatever you need to do with list of myEntries
        }
    });
}

function markAsComplete(id) {
    fetch("http://localhost:8080/complete", {
        method: 'POST',
        body: {
          "id": id
        } 
    }).then((response) => {
        if (response.startswith('Error')) {
            //Invalid request (not a corporation or something)
        } else {
            //Success
        }
    });
}