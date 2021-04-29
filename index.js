const inquirer = require('inquirer');
const { 
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  postDepartment,
  postRole,
  postEmployee,
  getDepartmentIdByName
} = require('./utils/crudFunctions.js');
const generateChoicesArray = require('./utils/generateChoicesArray.js')

function initialize() {
  console.log('Welcome to the Employee Tracker system.');
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
      return viewAllDepartments();
    case "Add a department":
      return addDepartment();
    case "View all roles":
      return viewAllRoles();
    case "Add a role":
      return addRole();
    case "View all employees":
      return viewAllEmployees();
    case "Add an employee":
      return addEmployee();
    case "Update an employee's email":
      return editEmployeeEmail();
    case "Exit Application":
      console.log("Buh bye.");
      return;
  }
}

function viewAllDepartments() {
  return getAllDepartments()
    .then(data => {
      console.table(data.data);
      return taskPrompt();
    });
};

function addDepartment() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the department?"
    }
  ])
    .then(data => { 
      console.log(data);
      return postDepartment(data);
    })
    .then(data => {
      console.log(data)
      return taskPrompt();
    })
};

function viewAllRoles() {
  return getAllRoles()
    .then(data => {
      console.table(data.data);
      return taskPrompt();
    });
};

function addRole() {
  return getAllDepartments()
    .then(data => inquirer.prompt([
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
          name: "department",
          message: "Which department is this role for?",
          choices: generateChoicesArray("name", data.data)
        }
      ])
    )
    .then(async function(data) {
      const departmentIdResponse = await getDepartmentIdByName(data.department);
      data.department_id = departmentIdResponse.data[0].department_id;
      return postRole(data);
    })
    .then(data => {
      console.log(`Added ${data.data.title} to the roles table.`);
      return taskPrompt();
    });
};

function viewAllEmployees() {
  return getAllEmployees()
    .then(data => {
      console.table(data.data);
      return taskPrompt();
    });
};

async function addEmployee() {
  const employeesAndRoles = await Promise.all([getAllEmployees(), getAllRoles()]).then(data => {
    return {employees: data[0].data, roles: data[1].data}
  });

  return inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the employee's last name?"
    },
    {
      type: "list",
      name: "role",
      message: "Which role does the employee perform?",
      choices: generateChoicesArray('title', employeesAndRoles.roles)
    },
    {
      type: "list",
      name: "manager",
      message: "Who is this employee's manager?",
      choices: generateChoicesArray('fullName', employeesAndRoles.employees)
    }
  ])
    .then(async function(data) {
      data.role_id = employeesAndRoles.roles.filter(roles => roles.title === data.role)[0].id;
      data.manager_id = employeesAndRoles.employees.filter(employees => employees.fullName === data.manager)[0].id;
      return postEmployee(data);
    })
    .then(data => {
      console.log(`Added ${data.data.first_name} ${data.data.last_name} to the employees table.`);
      return taskPrompt();
    })
};

function editEmployeeEmail(){
  return;
};

initialize();