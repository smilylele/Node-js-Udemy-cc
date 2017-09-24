const express = require("express");
const hbs = require("hbs");
const fs = require("fs")

hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("getCurrentyear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("capitalize", (text) => {
    return text.toUpperCase();
});
var app = express();


app.set("view engine", "hbs");

app.use((req, res, next) => {
    var now = new Date().toString();
    var log =`${now}: ${req.method} ${req.url}`;
    fs.appendFile("server.log", log + "\n", (err) => {
        if (err) {
            console.log("Unable to append the log into the file.")
        }
    })
    next();
})

app.use((req, res, next) => {
    res.render("maintenance.hbs");
})

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("home.hbs", {
        pageTitle : "home page",
        welcomeMessage : "This is my first nodejs website"
    })
})

app.get("/about", (req, res) => {
    // res.send("About Page!");
    res.render("about.hbs", {
        pageTitle : "About Page"
    });
})

app.get("/bad", (req, res) => {
    res.send({
        errorMessage : "This is bad Error msg."
    });
})

app.listen(3000, () => {
    console.log("Server is up on port 3000!");
});
