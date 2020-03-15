"use strict";

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const cors = require("cors");

const app = express();

const directorioPublico = path.join(__dirname, "public");

app.set("port", process.env.PORT || 4000);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ALLOW_ORIGIN || "*",
    methods: ["GET"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.static(directorioPublico));

app.use(favicon(path.join(directorioPublico, "/img", "icon.png")));

app.use("/robots.txt", (req, res) => {
  return res.type("text/plain").send("User-agent: *\nDisallow: *");
});

app.use(require("./routes/index"));

app.use(
  express.Router().get("", (req, res, next) => {
    return res.sendFile("index.html");
  })
);

const servidor = app.listen(app.get("port"), () => {
  console.log(
    `Servidor ejecutándose ${
      servidor.address().address
    } por el puerto ${app.get("port")}`
  );
});
