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

function getDepartmentsBudgets() {
    return fetch('http://localhost:3001/api/departments/budgets', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
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

function getAllEmployees(data) {
    let url = 'http://localhost:3001/api/employees?';

    if (data) {
        if (data.manager_id) {
            url += `manager_id=${data.manager_id}`;
        } else if (data.department_id) {
            url += `department_id=${data.department_id}`;
        }
    }

    return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    })
        .then(response => response.json());
};

function getManagers() {
    return fetch('http://localhost:3001/api/employees/managers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json());
}

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
};

function putEmployeeData(data) {
    return fetch(`http://localhost:3001/api/employee/${data.id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json());
};

function deleteDepartment(data) {
    return fetch(`http://localhost:3001/api/department/${data.id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json()});
};

function deleteRole(data) {
    return fetch(`http://localhost:3001/api/role/${data.id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json()});
};

function deleteEmployee(data) {
    return fetch(`http://localhost:3001/api/employee/${data.id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json()});
};

module.exports = {
    getAllDepartments,
    getDepartmentsBudgets,
    getAllRoles,
    getAllEmployees,
    getManagers,
    postDepartment,
    postRole,
    postEmployee,
    putEmployeeData,
    deleteDepartment,
    deleteRole,
    deleteEmployee
};