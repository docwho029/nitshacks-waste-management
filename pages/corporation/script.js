function getAssignedEntries (username) {
    fetch("http://localhost:8080/data", {
        method: 'POST',
        body: JSON.stringify({
          "name": ""
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then((response) => response.json()).then((data) => {
        var myEntries = data.assignedEntries;
        for (let i = 0; i < myEntries.length; i++) {
            row = document.createElement('tr');
            id = myEntries[i].id;
            btn = "<button class=\"button-view\" style=\"border: 0;\" id=\"button-mark-" + id + "\" onclick=\"markAsComplete(" + id + ");\">Mark as Done</button>";
            if (myEntries[i].completed) {
                btn = "<button class=\"button-view\" style=\"border: 0; cursor: not-allowed;\" id=\"button-mark-" + id + "\">Mark as Done</button>";
            }
            row.innerHTML = "<td> " + myEntries[i].title + "</td><td> " + myEntries[i].location + "</td><td> " + myEntries[i].type + "</td><td> </td><td> " + myEntries[i].date + "</td><td> " + myEntries[i].weight + " kg</td><td> " + myEntries[i].applicant + "</td><td> " + btn + "</td>";
            document.getElementById("data-list").appendChild(row);
        }
    });
}

function markAsComplete(id) {
    fetch("http://localhost:8080/complete", {
        method: 'POST',
        body: JSON.stringify({
          "id": id
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then((response) => response.json()).then((response) => {
        if (response.startswith('Error')) {
            alert("There was an error with your account, please relogin");
            fetch("http://localhost:8080/logout", {
                method: 'POST'
            });
            window.location.href = "http://localhost:8080/";
        } else {
            document.getElementById("button-mark-" + id).style.cursor = "not-allowed";
        }
    });
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
        var myEntries = data.assignedEntries;
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

getAssignedEntries();
getCommunity();

function logout() {
    fetch("http://localhost:8080/logout", {
        method: 'POST'
    });
    window.location.href = 'http://localhost:8080/';
}