function getMyEntries(username) {
    fetch("http://localhost:8080/data", {
        method: 'POST',
        body: JSON.stringify({
            "name": username
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then((response) => response.json()).then((data) => {
        var myEntries = data.myEntries;
        for (let i = 0; i < myEntries.length; i++) {
            row = document.createElement('tr');
            if (myEntries[i].corporation == null) {
                corp = "-"
            } else {
                corp = myEntries[i].corporation
            }
            if (myEntries[i].completed) {
                completed = "Collected!"
            } else {
                completed = "Not Collected!"
            }
            row.innerHTML = "<td> " + myEntries[i].title + "</td><td> " + myEntries[i].location + "</td><td> " + myEntries[i].type + "</td><td> </td><td> " + myEntries[i].date + "</td><td> " + myEntries[i].weight + " kg</td><td> " + corp + "</td><td> " + completed + "</td>";
            document.getElementById("data-list").appendChild(row);
        }
    });
}

function newEntry(title, loc, nature, weight, date) {
    fetch("http://localhost:8080/entry", {
        method: 'POST',
        body: JSON.stringify({
            "title": title,
            "location": loc,
            "nature": nature,
            "weight": weight,
            "date": date
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then((response) => response.text()).then((response) => {
        if (response.startsWith('Error')) {
            alert("There was an error with your account. Please relogin.");
        } else {
            document.getElementById('nav-myCollections').click();
        }
    });
}

function logout() {
    fetch("http://localhost:8080/logout", {
        method: 'POST'
    });
    window.location.href = 'http://localhost:8080/';
}

function getCommunity() {
    fetch("http://localhost:8080/data", {
        method: 'POST',
        body: JSON.stringify({
            "name": ""
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then((response) => response.json()).then((data) => {
        var myEntries = data.myEntries;
        total = 0;
        total_weight = 0;

        for(let i = 0; i < myEntries.length; i++) {
            if (myEntries[i].completed) {
                total += 1;
                total_weight += myEntries[i].weight;
            }
        }

        document.getElementById("your-collections-value").innerHTML = "" + total;
        document.getElementById("your-weight-value").innerHTML = total_weight + "<span>kg</span>";
    });

    fetch("http://localhost:8080/entries", {
        method: 'GET'
    }).then((response) => response.json()).then((data) => {
        total = 0;
        total_weight = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].completed) {
                total++;
                total_weight += data[i].weight;
            }
        }

        document.getElementById("total-collections-value").innerHTML = total;
        document.getElementById("total-weight-value").innerHTML = total_weight + "<span>kg</span>";
    });
}

function submit() {
    title = document.getElementById("title").value;
    loc = document.getElementById("location").value;
    nature = document.getElementById("nature").value;
    weight = document.getElementById("weight").value;
    dt = new Date();
    date = dt.getDate() + '-' + dt.getMonth() + '-' + dt.getFullYear();

    row = document.createElement('tr');
    corp = "-";
    completed = "Not Collected!"
    row.innerHTML = "<td> " + title + "</td><td> " + loc + "</td><td> " + nature + "</td><td> </td><td> " + date + "</td><td> " + weight + " kg</td><td> " + corp + "</td><td> " + completed + "</td>";
    document.getElementById("data-list").appendChild(row);

    newEntry(title, loc, nature, weight, date);
}

getMyEntries("");
getCommunity();