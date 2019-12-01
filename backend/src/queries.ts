// Stworzenie stałej która zawiera całe zapytanie do bazy danych o pobranie wszystkich użytkowników
export const GET_EMPLOYEES = `select e.id, e.firstName, e.lastName, p.position, d.department, e.email, e.type from 
employees as e, 
departments as d, 
positions as p where 
e.position = p.id and 
e.department = d.id;`;

// Stworzenie stałej która zawiera całe zapytanie do bazy danych o pobranie pojedynczego użytkownika na podstawie jego ID
export const GET_EMPLOYEE = (id: string) => `select e.firstName, e.lastName, p.position, d.department, e.email, e.type from
employees as e,
departments as d,
positions as p where
e.position = p.id and 
e.department = d.id and
e.id = ${id};`;

// Stworzenie stałej która zawiera całe zapytanie do bazy danych o pobranie pojedynczego użytkownika na podstawie jego emaila
export const GET_EMPLOYEE_BY_EMAIL = (email: string) => `select e.firstName, e.lastName, p.position, d.department, e.email, e.type from
employees as e,
departments as d,
positions as p where
e.position = p.id and 
e.department = d.id and
e.email = '${email}';`;

// Stworzenie stalej która zawiera cale zapytanie do bazy danych o
// utworzenie nowego użytkownika w bazie danych na podstawie danych które są przekazywane jako parametry
export const ADD_EMPLOYEE = (firstName: string, lastName: string, position: string, department: string, email: string, type: string) =>
  `insert into employees(firstName, lastName, position, department, email, type) 
    values('${firstName}', '${lastName}', ${position}, ${department}, '${email}', '${type}')`;

// Stworzenie stałej która zawiera całe zapytanie do bazy danych
// o aktualizację użytkownika na podstawie danych przesłanych w parametrach
export const UPDATE_EMPLOYEE = (
  firstName: string,
  lastName: string,
  position: number | string,
  department: number | string,
  email: string,
  type: string,
  id: number | string) =>
  `update employees set 
    firstName = '${firstName}', 
    lastName = '${lastName}', 
    position = ${position}, 
    department = ${department},
    type = '${type}',
    email = '${email}' where id = ${id};`;

// Stworzenie stałej zawierającej zapytanie do bazy danych o usunięcie użytkownika na podstawie jego ID
export const DELETE_EMPLOYEE = (id: number | string) => `delete from employees where id = ${id};`;
