const fetch = require('node-fetch');
const inquirer = require('inquirer');

function initialize(){
  console.log('Welcome to the Employee Tracker system.')
  return taskPrompt();
};

function taskPrompt() {
  return inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "Add a department", 
        "View all roles", 
        "Add a role",
        "View all employees",
        "Add an employee", 
        "Update an employee's email",
        "Exit application"
      ]
    }
  ])
    .then(data => getTask(data.option));
};

function getTask(option) {
  switch (option) {
    case "View all departments":
      return getAllDepartments();
    case "View all employees":
      return getAllEmployees();
    case "View all roles":
      return getAllRoles();
    case "Add a department":
      return postDepartment();
    case "Add an employee":
      return postEmployee();
    case "Add a role":
      return postRole();
    case "Update an employee's email":
      return putEmployeeEmail();
    case "Exit Application":
      console.log("Buh bye.");
      return;
  }
}

function getAllDepartments() {
  return fetch('http://localhost:3001/api/departments/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(data => data.json())
    .then(data => {
      console.table(data.data);
      return taskPrompt();
    });
};

function getAllRoles() {
  return fetch('http://localhost:3001/api/roles/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(data => data.json())
    .then(data => {
      console.table(data.data);
      return taskPrompt();
    });
};

function getAllEmployees() {
  return fetch('http://localhost:3001/api/employees/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(data => data.json())
    .then(data => {
      console.table(data.data);
      return taskPrompt();
    });
};

function postDepartment() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the department?"
    }
  ])
    .then(data => { 
      console.log(data);
      return fetch(`http://localhost:3001/api/department`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      return taskPrompt();
    })
};

function postRole() {
  return fetch('http://localhost:3001/api/departments/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(data => data.json())
    .then(data => {
      let departments = data.data.reduce((acc, cur) => {
        acc.push(cur.name);
        return acc;
      }, []);

      return inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title of the role?"
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?"
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department is this role for?",
          choices: departments
        }
      ])
    })
    .then(data => {
      console.log(data);
      return fetch('http://localhost:3001/api/role', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return taskPrompt();
    });
};

function postEmployee() {

};

function putEmployeeEmail(){

};

initialize();