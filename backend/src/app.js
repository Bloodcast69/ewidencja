"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');
var queries_1 = require("./queries");
var Pool = require('pg').Pool;
var pool = new Pool({
    user: 'postgres',
    host: '93.105.88.222',
    database: 'ewidencja-api',
    password: 'ewidencja',
    port: 5432
});
var app = express();
var fakeLoginCredentials = { email: 'user@example.com', password: 'user123' };
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors('Access-Control-Allow-Origin: *'));
app.get("/login", function (req, res) {
    var _a = req.query, email = _a.email, password = _a.password;
    if (email === fakeLoginCredentials.email && password === fakeLoginCredentials.password) {
        pool.query(queries_1.GET_EMPLOYEE_BY_EMAIL(email), function (err, dbRes) {
            if (err) {
                throw err;
            }
            res.status(200).json(dbRes.rows[0]);
        });
    }
    else {
        res.sendStatus(400);
    }
});
app.get('/users', function (req, res) {
    pool.query(queries_1.GET_EMPLOYEES, function (err, dbRes) {
        if (err) {
            throw err;
        }
        res.status(200).json({ employees: dbRes.rows });
    });
});
app.get('/users/:id', function (req, res) {
    var id = req.params.id;
    pool.query(queries_1.GET_EMPLOYEE(id), function (err, dbRes) {
        if (err) {
            throw err;
        }
        res.status(200).json({ employees: dbRes.rows });
    });
});
app.post('/users/add', function (req, res) {
    var _a = req.body, firstname = _a.firstname, lastname = _a.lastname, position = _a.position, department = _a.department, email = _a.email, type = _a.type;
    pool.query(queries_1.ADD_EMPLOYEE(firstname, lastname, position, department, email, type), function (err) {
        if (err) {
            throw err;
        }
        pool.query(queries_1.GET_EMPLOYEES, function (error, dbRes) {
            if (error) {
                throw error;
            }
            res.status(200).json(dbRes.rows);
        });
    });
});
app.put('/users/:id', function (req, res) {
    var id = req.params.id;
    var _a = req.body, firstname = _a.firstname, lastname = _a.lastname, position = _a.position, department = _a.department, email = _a.email, type = _a.type;
    pool.query(queries_1.UPDATE_EMPLOYEE(firstname, lastname, position, department, email, type, id), function (err) {
        if (err) {
            throw err;
        }
        pool.query(queries_1.GET_EMPLOYEES, function (error, dbRes) {
            if (error) {
                throw error;
            }
            res.status(200).json(dbRes.rows);
        });
    });
});
app["delete"]('/users/:id', function (req, res) {
    var id = req.params.id;
    pool.query(queries_1.DELETE_EMPLOYEE(id), function (err) {
        if (err) {
            throw err;
        }
        pool.query(queries_1.GET_EMPLOYEES, function (error, dbRes) {
            if (error) {
                throw error;
            }
            res.status(200).json(dbRes.rows);
        });
    });
});
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server is running in http://localhost:" + PORT);
});
