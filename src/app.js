const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

//define paths for express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");

//setup handle bars engine and views engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialspath);

//set up static directory to serve
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Busaina",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Busaina",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is a help section!",
    name: "Busaina",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.loc) {
    return res.send({
      error: "please provie an address",
    });
  }
  geocode(req.query.loc, (error, { location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(location, (error, forecastdata, img) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastdata,
        location,
        address: req.query.loc,
        img,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term!",
    });
  }
  console.log(req.query.rating);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Busaina",
    error: "help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Busaina",
    error: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
