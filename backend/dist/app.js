"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.get('/email', function (req, res) {
    console.log(res);
});
app.listen('3000', function () {
    console.log("Express app listens on port: 3000");
});
