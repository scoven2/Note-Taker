//Dependencies
const express = require("express");
const path = require("path");
const fs = reqiure("fs");

//unique id
const { v4: uuidv4 } = require("uuid");

//Express app set up
const app = express();
const PORT = express.env.PORT || 8888;

//data parsing, encouding, static, middleward
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//listener
app.listen(PORT, () =>
    console.log(`App listening to PORT: ${PORT}`));