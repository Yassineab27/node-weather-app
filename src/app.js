const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
// for heroku
const port = process.env.PORT || 3000;

// Setup Handlebars engine & views location
app.set("view engine", "hbs") // use after: npm i hbs
app.set("views", path.join(__dirname, "../templates/views"));
// if you want to costumize the name of the folder "views"
hbs.registerPartials(path.join(__dirname, "../templates/partials"))

// Set up static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Abdou"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me!",
        name: "RoboCo"
    });
});

app.get("/weather", (req, res) => {
    if(!req.query.location) {
        return res.send({
            Error: "Please provide location!"
        });
    };
    console.log(req.query.location);
    geocode(req.query.location, (err, data) => {
        if(err) {
            return res.send({
                Error: err
            });
        };
        const { latitude, longitude, location } = data
        forecast(latitude, longitude, (err, weatherRes) => {
            if(err) {
                return res.send({
                    Error: err
                });
            };
            res.send({
                location,
                forecast: weatherRes
            });
        });
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        content: "How can we help you?!"
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Error 404:",
        message: "Help Article Not Found!"
    });
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "Error 404:",
        message: "Page Not Found!"
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});