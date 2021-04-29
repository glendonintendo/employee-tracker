const fetch = require('node-fetch');

function getAllDepartments() {
    return fetch('http://localhost:3001/api/departments/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
    })
        .then(response => response.json());
};

function getDepartmentIdByName(name) {
    return fetch(`http://localhost:3001/api/department/${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json());
}

function getAllRoles() {
    return fetch('http://localhost:3001/api/roles/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
};

function getAllEmployees() {
    return fetch('http://localhost:3001/api/employees/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            data.data.forEach(employeeObj => employeeObj.fullName = `${employeeObj.first_name} ${employeeObj.last_name}`);
            return data;
        });
};

function postDepartment(data) {
    return fetch(`http://localhost:3001/api/department`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json());
};

function postRole(data) {
    return fetch('http://localhost:3001/api/role', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json());
};

function postEmployee(data) {
    return fetch('http://localhost:3001/api/employee', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json());
}

module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    postDepartment,
    postRole,
    postEmployee,
    getDepartmentIdByName
};