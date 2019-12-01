import express = require('express'); // Import frameworku serwerowego ExpressJS
import * as bodyParser from 'body-parser'; // Import biblioteki body-parser, która parsuje dane z frontu do formatu JSON

const cors = require('cors'); // Import biblioteki która rozwiązuje problem CORS (Cross-Origin)
import {
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  GET_EMPLOYEE,
  GET_EMPLOYEE_BY_EMAIL,
  GET_EMPLOYEES,
  UPDATE_EMPLOYEE
} from './queries';

const {Pool} = require('pg'); // Import biblioteki która odpowiada za łączenie się z bazą danych PostgreSQL

// Konfiguracja połączenia z bazą danych
const pool = new Pool({
  user: 'postgres',
  host: '93.105.88.222',
  database: 'ewidencja-api',
  password: 'ewidencja',
  port: 5432,
});

// Zadeklarowanie stałej 'app', która uruchamia framework ExpressJS
const app = express();
// Zadeklarowanie stałej z zapisanymi na sztywno danymi logowania użytkownika
const fakeLoginCredentials: { email: string, password: string } = {email: 'user@example.com', password: 'user123'};

// Konfiguracja biblioteki body-parser
app.use(bodyParser.urlencoded({extended: true}));
// Wywołanie metody json() która parsuje wszystkie dane do formatu JSON
app.use(bodyParser.json());
// Rozwiązanie problemu Cross-Origin, czyli sytuacji w której w trybie developerskim frontend nie może skontaktować się z backendem
app.use(cors('Access-Control-Allow-Origin: *'));

/*
  * Stworzenie endpointu '/login' - endpoint służy do wysłania zapytania z danymi logowania z frontu
  * i sprawdzenia ich z zapisanymi danymi w stałej 'fakeLoginCredentials'.
 */
app.get('/login', (req: any, res: any) => {
  const {email, password} = req.query;

  // Jeśli dane z zapytania pokrywają się z danymi zapisanymi w 'fakeLoginCredentials'
  // wysyłane jest zapytanie do bazy danych o pobranie danych użytkownika
  if (email === fakeLoginCredentials.email && password === fakeLoginCredentials.password) {
    pool.query(GET_EMPLOYEE_BY_EMAIL(email), (err, dbRes) => {
      // Jeśli wystąpi błąd, zgłoś wyjątek
      if (err) {
        throw err;
      }
      // W przeciwnym razie zwróć status 200 (Sukces) oraz zwróć dane użytkownika jako obiekt JSON
      res.status(200).json(dbRes.rows[0]);
    });
  } else {
    // Jeśli dane się nie zgadzają to zwróć status 400 (Błąd)
    res.sendStatus(400);
  }
});

// Stworzenie endpointu '/users' który pobiera wszystkich użytkowników z bany danych, i zwraca je do frontu
app.get('/users', (req: any, res: any) => {
  pool.query(GET_EMPLOYEES, (err, dbRes) => {
    // Jeśli wystąpi błąd, zgłoś wyjątek
    if (err) {
      throw err;
    }

    // Zwróć status 200 (Sukces) oraz zwróć dane użytkowników jako obiekt JSON
    res.status(200).json({employees: dbRes.rows});
  });
});

// Stworzenie endpointu '/users/:id' który pobiera użytkownika na podstawie jego identyfikatora z bany danych,
// i zwraca go do frontu
app.get('/users/:id', (req: any, res: any) => {
    // Stworzenie stałej 'id' która pobiera z parametrów zapytania wartość id użytkownika
    const {id} = req.params;

    // Wysłanie zapytania do bazy danych o pobranie użytkownika z danym ID
    pool.query(GET_EMPLOYEE(id), (err, dbRes) => {
      // Jeśli będzie błąd, zgłoś wyjątek
      if (err) {
        throw err;
      }

      // Zwróć status 200 (Sukces) oraz zwróć dane użytkownika jako obiekt JSON
      res.status(200).json({employees: dbRes.rows});
    });
  }
);

// Stworzenie endpointu '/users/add' - endpoint służący do stworzenia nowego użytkownika
app.post('/users/add', (req: any, res: any) => {
  // Stworzenie stałych ze wszystkimi danymi które sa wymagane do stworzenia użytkownika
  const {firstname, lastname, position, department, email, type} = req.body;

  // Wysłanie zapytania do bazy danych które ma utworzyć użytkownika
  pool.query(ADD_EMPLOYEE(firstname, lastname, position, department, email, type), (err) => {
    // Jeśli będzie błąd, zgłoś wyjątek
    if (err) {
      throw err;
    }
    // W przeciwnym razie utworzy użytkownika a następnie wyśle zapytanie do bazy danych o pobranie wszystkich użytkowników
    pool.query(GET_EMPLOYEES, (error, dbRes) => {
      // Jeśli będzie błąd, zgłoś wyjątek
      if (error) {
        throw error;
      }

      // Zwróć status 200 (Sukces) oraz zwróć dane użytkowników (włącznie z nowo dodanym) jako obiekt JSON
      res.status(200).json(dbRes.rows);
    });
  });
});

// Endpoint '/users/:id' - Endpoint służący do updatu (aktualizacji) danych użytkownika
app.put('/users/:id', (req: any, res: any) => {
  // Stworzenie stałych z danymi użytkownika
  const {id} = req.params;
  const {firstname, lastname, position, department, email, type} = req.body;

  // Wysłanie zapytania do bazy danych o aktualizację użytkownika
  pool.query(UPDATE_EMPLOYEE(firstname, lastname, position, department, email, type, id), (err) => {
    // Jeśli będzie błąd, zgłoś wyjątek
    if (err) {
      throw err;
    }

    // Jeśli użytkownik się zaktualizuje, wykona zapytanie do bazy danych o pobranie wszystkich użytkowników
    pool.query(GET_EMPLOYEES, (error, dbRes) => {
      // Jeśli będzie błąd, zgłoś wyjątek
      if (error) {
        throw error;
      }

      // Zwróć status 200 (Sukces) oraz zwróć dane użytkowników (włącznie z tym zaktualizowanym) jako obiekt JSON
      res.status(200).json(dbRes.rows);
    });
  });
});

// Endpoint '/users/:id' - Endpoint służący do usuwania użytkownika z bazy
app.delete('/users/:id', (req: any, res: any) => {
  // Tworzenie stałej 'id' przechowującą ID użytkownika
  const {id} = req.params;

  // Wysłanie zapytania do bazy o usunięcie użytkownika
  pool.query(DELETE_EMPLOYEE(id), (err) => {
    // Jeśli będzie błąd, zgłoś wyjątek
    if (err) {
      throw err;
    }

    // Wysyłanie zapytania do bazy danych o pobranie wszystkich użytkowników
    pool.query(GET_EMPLOYEES, (error, dbRes) => {
      // Jeśli będzie błąd, zgłoś wyjątek
      if (error) {
        throw error;
      }

      // Zwraca status 200 (Sukces) i zwraca wszystkich użytkowników (po usunięciu tego jednego)
      res.status(200).json(dbRes.rows);
    });
  });
});

// Zadeklarowanie stałej PORT na której będzie nasłuchiwała aplikacja
const PORT = process.env.PORT || 3000;

// Uruchomienie aplikacji na porcie 3000
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
