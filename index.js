const fs = require('fs');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use(cookieParser());

app.listen(8080, () => {
    console.log('Online at http://localhost:8080');
});

//Adding a new user
app.post('/signup', (req, res) => {
    const { name, password, type } = req.body;

    accounts = JSON.parse(fs.readFileSync('./accounts.json'));
    if (name in accounts) {
        res.send('Error. User already exists.');
    } else {
        //Updating and storing data
        accounts[name] = {
            password: password,
            type: type,
            data: {
                "myEntries": [],
                "assignedEntries": []
            }
        }
        fs.writeFileSync('./accounts.json', JSON.stringify(accounts, null, 4));

        //Setting the cookies
        res.cookie('name', name);
        res.cookie('password', password);
        res.cookie('type', type);

        //Sending a response
        res.send('Success. User registered.');
    }
});

//Logging in to previous account
app.post('/login', (req, res) => {
    const { name, password } = req.body;

    accounts = JSON.parse(fs.readFileSync('./accounts.json'));
    if (name in accounts) {
        if (accounts[name]["password"] == password) {
            type = accounts[name]["type"];

            //Setting the cookies
            res.cookie('name', name);
            res.cookie('password', password);
            res.cookie('type', type);

            //Sending a response
            res.send('Success. User logged in.');
        } else {
            res.cookie('name', '');
            res.cookie('password', '');
            res.cookie('type', '');
            res.send('Error, invalid password');
        }
    } else {
        res.send('Error, user does not exist');
    }
});

app.get('/data', function (req, res) {
    username = req.body.name;
    accounts = JSON.parse(fs.readFileSync('./accounts.json'));
    data = accounts[username]["data"];
    /* specific data based on type
    if (type==="Resident"){
      data = accounts.username["data"].myEntries;
    }
    else if (type==="Corporation"){
      data = accounts.username["data"].assignedEntries;
    }
    */
    res.send(data);
});

//Creating a new entry
app.post('/entry', (req, res) => {
    const { name, password, type } = req.cookies;
    const { title, location, nature, weight, date } = req.body;

    accounts = JSON.parse(fs.readFileSync('./accounts.json'));

    if (name in accounts) {
        if (accounts[name]['password'] == password && accounts[name]['type'] == 'resident') {
            entries = JSON.parse(fs.readFileSync('./entries.json'));

            //Creating the new entry
            entry = {
                title: title,
                id: entries.length + 1,
                location: location,
                type: nature,
                weight: weight,
                date: date,
                applicant: name,
                assigned: false,
                corporation: null,
                completed: false
            };

            //Updating and writing into database
            entries.push(entry);
            accounts[name][myEntries].push(entry);
        } else if (accounts[name]['type'] != 'resident') {
            res.send('Error, must be a resident to create an entry');
        } else {
            res.send('Error, invalid password');
        }
    } else {
        res.send('Error, user does not exist');
    }
});

// Mark Entry complete
app.post("/complete", function (req, res) {
    const { name, password, type } = req.cookies;
    if (type === "Corporation") {
        entry_id = req.body.id;
        for (var i = 0; i < entries.length; i++) {
            //looping over all entries to find the one with matching id
            if (entries[i].id === entry_id) {
                entries[i].completed = true;
                applicant = entries[i].applicant;
                break;
            }
        }

        corp_assignedEntries = accounts[name]["data"]["assignedEntries"];
        resident_myEntries = accounts[applicant]["data"]["myEntries"];

        //looping over corporations entries to find the one with matching id
        for (var i = 0; i < corp_assignedEntries.length; i++) {
            if (corp_assignedEntries[i].id === entry_id) {
                corp_assignedEntries[i].completed = true;
                break;
            }
        }

        //looping over resident's entries to find the one with matching id
        for (var i = 0; i < resident_myEntries.length; i++) {
            if (resident_myEntries[i].id === entry_id) {
                resident_myEntries[i].completed = true;
                break;
            }
        }

        res.send("Success, Entry marked complete");
    }
    else {
        res.send("Error, Invalid Request");
    }

});

// Assign entry
app.post("/assign", function (req, res) {
    const { name, password, type } = req.cookies;

    if (type === "management") {
        username = req.body.name;
        entry_id = req.body.id;

        for (var i = 0; i < entries.length; i++) {
            if (entries[i].id === entry_id) {
                entries[i].assigned = true;
                entries[i]["corporation"] = username;

                resident = entries[i].applicant;
                entry = entries[i];
                break;
            }
        }

        accounts.username["data"].assignedEntries.push(entry);

        for (let i = 0; i < accounts.resident.data['myEntries'].length; i++) {
            if (accounts.resident.data['myEntries'][i].id == entry_id) {
                accounts.resident.data['myEntries'][i].assigned = true;
                accounts.resident.data['myEntries'][i]["corporation"] = username;
                break;
            }
        }

        res.send("Success, Entry assigned successfully");
    }
    else {
        res.send("Error, Invalid request");
    }

});



/* ------------------------- Routes for pages --------------------------- */

app.get('/', (req, res) => {
    const { name, password, type } = req.cookies;

    if (!name || !password || !type) {
        res.cookie("name", "");
        res.cookie("password", "");
        res.cookie("type", "");
        res.redirect("http://localhost:8080/login");
    } else {
        res.redirect(`http://localhost:8080/${type}`);
    }
});

app.get('/resident', (req, res) => {
    res.sendFile('./pages/resident/index.html');
});

app.get('/manager', (req, res) => {
    res.sendFile('./pages/manager/index.html');
});

app.get('/corporation', (req, res) => {
    res.sendFile('./pages/corporation/index.html');
});

app.get('/resource/:path', (req, res) => {
    const { path } = req.params;
    try {
        res.sendFile(`./pages/${path}`);
    } catch (e) {
        console.log(e);
    }
});