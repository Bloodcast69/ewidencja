"use strict";
exports.__esModule = true;
exports.GET_EMPLOYEES = "select e.id, e.firstName, e.lastName, p.position, d.department, e.email, e.type from \nemployees as e, \ndepartments as d, \npositions as p where \ne.position = p.id and \ne.department = d.id;";
exports.GET_EMPLOYEE = function (id) { return "select e.firstName, e.lastName, p.position, d.department, e.email, e.type from\nemployees as e,\ndepartments as d,\npositions as p where\ne.position = p.id and \ne.department = d.id and\ne.id = " + id + ";"; };
exports.GET_EMPLOYEE_BY_EMAIL = function (email) { return "select e.firstName, e.lastName, p.position, d.department, e.email, e.type from\nemployees as e,\ndepartments as d,\npositions as p where\ne.position = p.id and \ne.department = d.id and\ne.email = '" + email + "';"; };
exports.ADD_EMPLOYEE = function (firstName, lastName, position, department, email, type) {
    return "insert into employees(firstName, lastName, position, department, email, type) \n    values('" + firstName + "', '" + lastName + "', " + position + ", " + department + ", '" + email + "', '" + type + "')";
};
exports.UPDATE_EMPLOYEE = function (firstName, lastName, position, department, email, type, id) {
    return "update employees set \n    firstName = '" + firstName + "', \n    lastName = '" + lastName + "', \n    position = " + position + ", \n    department = " + department + ",\n    type = '" + type + "',\n    email = '" + email + "' where id = " + id + ";";
};
exports.DELETE_EMPLOYEE = function (id) { return "delete from employees where id = " + id + ";"; };
