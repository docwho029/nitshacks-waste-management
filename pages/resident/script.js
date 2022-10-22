function getMyEntries (username) {
    fetch("http://localhost:8080/data", {
        method: 'POST',
        body: {
          "name": username
        } 
    }).then((response) => response.json()).then((data) => {
        var myEntries = data.myEntries;
        for (let i = 0; i < myEntries.length; i++) {
            //Do whatever you need to do with list of myEntries
        }
    });
}

function newEntry (title, location, nature, weight, date) {
    fetch("http://localhost:8080/entry", {
        method: 'POST',
        body: {
          "title": title,
          "location": location,
          "nature": nature,
          "weight": weight,
          "date": date
        } 
    }).then((response) => {
        if (response.startswith('Error')) {
            //user doesnt exist or invalid password or user isn't a resident
        } else {
            //Success
        }
    });
}