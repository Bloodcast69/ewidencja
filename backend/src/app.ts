import express = require('express');
import * as bodyParser from 'body-parser';

const cors = require('cors');
import {
    ADD_EMPLOYEE,
    DELETE_EMPLOYEE,
    GET_EMPLOYEE,
    GET_EMPLOYEE_BY_EMAIL,
    GET_EMPLOYEES,
    UPDATE_EMPLOYEE
} from "./queries";

const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '93.105.88.222',
    database: 'ewidencja-api',
    password: 'ewidencja',
    port: 5432,
});
const app = express();
const fakeLoginCredentials: { email: string, password: string } = {email: 'user@example.com', password: 'user123'};

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors('Access-Control-Allow-Origin: *'));

app.get("/login", (req: any, res: any) => {
    const {email, password} = req.query;

    if (email === fakeLoginCredentials.email && password === fakeLoginCredentials.password) {
        pool.query(GET_EMPLOYEE_BY_EMAIL(email), (err, dbRes) => {
            if (err) {
                throw err;
            }
            res.status(200).json(dbRes.rows[0]);
        })
    } else {
        res.sendStatus(400);
    }
});

app.get('/users', (req: any, res: any) => {
    pool.query(GET_EMPLOYEES, (err, dbRes) => {
        if (err) {
            throw err;
        }

        res.status(200).json({employees: dbRes.rows});
    })
});

app.get('/users/:id', (req: any, res: any) => {
        const {id} = req.params;

        pool.query(GET_EMPLOYEE(id), (err, dbRes) => {
            if (err) {
                throw err;
            }
            res.status(200).json({employees: dbRes.rows});
        })
    }
);

app.post('/users/add', (req: any, res: any) => {
    const {firstname, lastname, position, department, email, type} = req.body;

    pool.query(ADD_EMPLOYEE(firstname, lastname, position, department, email, type), (err) => {
        if (err) {
            throw err
        }
        pool.query(GET_EMPLOYEES, (error, dbRes) => {
            if (error) {
                throw error;
            }
            res.status(200).json(dbRes.rows);
        });
    })
});

app.put('/users/:id', (req: any, res: any) => {
    const {id} = req.params;
    const {firstname, lastname, position, department, email, type} = req.body;

    pool.query(UPDATE_EMPLOYEE(firstname, lastname, position, department, email, type, id), (err) => {
        if (err) {
            throw err;
        }
        pool.query(GET_EMPLOYEES, (error, dbRes) => {
            if (error) {
                throw error;
            }
            res.status(200).json(dbRes.rows);
        });
    })
});

app.delete('/users/:id', (req: any, res: any) => {
    const {id} = req.params;

    pool.query(DELETE_EMPLOYEE(id), (err) => {
        if (err) {
            throw err;
        }
        pool.query(GET_EMPLOYEES, (error, dbRes) => {
            if (error) {
                throw error;
            }
            res.status(200).json(dbRes.rows);
        });
    })
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`)
});
