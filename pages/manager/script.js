function assign(username, id) {
    fetch("http://localhost:8080/assign", {
        method: 'POST',
        body: JSON.stringify({
          "name": username,
          "id": id
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then((response) => response.text()).then((response) => {
        if (response.startsWith("Error")) {
            alert("There was an issue with your request. Please recheck all the data and try again");
        } else {
            document.getElementById("button-assign-" + id).disabled = true;
            document.getElementById("button-assign-" + id).style.cursor = "not-allowed";
            document.getElementById("button-assign-" + id).onclick = "";
            document.getElementById("input-assign-" + id).value = "";
        }
    });
}

function getCommunity() {

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

function getCollections() {
    fetch("http://localhost:8080/entries", {
        method: 'GET'
    }).then((response) => response.json()).then((data) => {
        for (let i = 0; i < data.length; i++) {
            id = data[i].id;
            row = document.createElement("tr");
            attr = "";
            btn = "<button class=\"button-view\" style=\"border: 0;\"" + attr + " onclick=\"submit(" + id + ");\" id=\"button-assign-" + id + "\">Send</button>";
            if (data[i].assigned) {
                attr = " disabled";
                btn = "<button class=\"button-view\" style=\"border: 0; cursor: not-allowed;\"" + attr + " id=\"button-assign-" + id + "\">Send</button>";
            }
            row.innerHTML = "<td> " + data[i].title + "</td><td> " + data[i].location + "</td><td> " + data[i].type + "</td><td> </td><td> " + data[i].date + "</td><td> " + data[i].weight + " kg</td><td> " + data[i].applicant + "</td><td><div  style=\"display: flex; flex-flow: row nowrap;\"><input type=\"text\" name=\"\" id=\"input-assign-" + id + "\">" + btn + "</div></td>";
            document.getElementById("collections-table").appendChild(row);
        }
    });
}

function submit(id) {
    var name = document.getElementById("input-assign-" + id).value;
    assign(name, id);
}

getCommunity();
getCollections();

function logout() {
    fetch("http://localhost:8080/logout", {
        method: 'POST'
    });
    window.location.href = 'http://localhost:8080/';
}