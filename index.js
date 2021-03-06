const inquirer = require('inquirer');
const { 
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
} = require('./utils/crudFunctions.js');
const generateChoicesArray = require('./utils/generateChoicesArray.js');
const cTable = require('console.table');

function initialize() {
  console.log('\nWelcome to the Employee Tracker system.\n');
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
        "View total used budget by department",
        "View all roles", 
        "View all employees",
        "View employees by department",
        "View employees by manager",
        "Add a department", 
        "Add a role",
        "Add an employee", 
        "Update an employee's role",
        "Update an employee's manager",
        "Remove a department",
        "Remove a role",
        "Remove an employee",
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
    case "View total used budget by department":
      return viewDepartmentsBudgets();
    case "View all roles":
      return viewAllRoles();
    case "View all employees":
      return viewAllEmployees();
    case "View employees by department":
      return viewEmployeesByDepartment();
    case "View employees by manager":
        return viewEmployeesByManager();
    case "Add a department":
      return addDepartment();
    case "Add a role":
      return addRole();
    case "Add an employee":
      return addEmployee();
    case "Update an employee's role":
      return editEmployeeRole();
    case "Update an employee's manager":
      return editEmployeeManager();
    case "Remove a department":
      return removeDepartment();
    case "Remove a role":
      return removeRole();
    case "Remove an employee":
      return removeEmployee();
    case "Exit Application":
      console.log("Buh bye.");
      return;
  }
};

function viewAllDepartments() {
  return getAllDepartments()
    .then(data => {
      console.table(data.data);
      return taskPrompt();
    });
};

function viewDepartmentsBudgets() {
  return getDepartmentsBudgets()
    .then(data => {
      console.table(data.data);
      return taskPrompt();
    });
};

function viewAllRoles() {
  return getAllRoles()
    .then(data => {
      console.table(data.data);
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

async function viewEmployeesByDepartment() {
  const departments = await getAllDepartments();

  return inquirer.prompt([
    {
      type: "list",
      name: "name",
      message: "For which department do you want to see the employees?",
      choices: generateChoicesArray("name", departments.data)
    }
  ])
    .then(data => {
      data.department_id = departments.data.filter(department => department.name === data.name)[0].id;
      console.log(data);
      return getAllEmployees(data);
    })
    .then(data => {
      console.table(data.data);
      return taskPrompt();
    })
};

async function viewEmployeesByManager() {
  const managers = await getManagers();

  return inquirer.prompt([
    {
      type: "list",
      name: "full_name",
      message: "For which manager would you like to see employees?",
      choices: generateChoicesArray("full_name", managers.data)
    }
  ])
    .then(data => {
      data.manager_id = managers.data.filter(manager => manager.full_name === data.full_name)[0].id;
      return getAllEmployees(data);
    })
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
      return postDepartment(data);
    })
    .then(data => {
      console.log(`\nAdded ${data.data.name} to the departments table.\n`);
      return taskPrompt();
    });
};

async function addRole() {
  const departments = await getAllDepartments();

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
      name: "department",
      message: "Which department is this role for?",
      choices: generateChoicesArray("name", departments.data)
    }
  ])
    .then(data => {
      data.department_id = departments.data.filter(department => department.name === data.department)[0].id;
      return postRole(data);
    })
    .then(data => {
      console.log(`\nAdded ${data.data.title} to the roles table.\n`);
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
      choices: ["None", ...generateChoicesArray('full_name', employeesAndRoles.employees)]
    }
  ])
    .then(data => {
      data.role_id = employeesAndRoles.roles.filter(roles => roles.title === data.role)[0].id;
      data.manager_id = (data.manager === "None") ? null : employeesAndRoles.employees.filter(employees => employees.full_name === data.manager)[0].id;
      return postEmployee(data);
    })
    .then(data => {
      console.log(`\nAdded ${data.data.first_name} ${data.data.last_name} to the employees table.\n`);
      return taskPrompt();
    });
};

async function editEmployeeRole(){
  const employeesAndRoles = await Promise.all([getAllEmployees(), getAllRoles()]).then(data => {
    return {employees: data[0].data, roles: data[1].data}
  });
  
  return inquirer.prompt([
    {
      type: "list",
      name: "full_name",
      message: "Which employee would you like to update?",
      choices: generateChoicesArray('full_name', employeesAndRoles.employees)
    },
    {
      type: "list",
      name: "title",
      message: "What role are they now fulfilling?",
      choices: generateChoicesArray('title', employeesAndRoles.roles)
    }
  ])
    .then(data => {
      data.id = employeesAndRoles.employees.filter(employee => employee.full_name === data.full_name)[0].id;
      data.role_id = employeesAndRoles.roles.filter(role => role.title === data.title)[0].id;
      console.log(data);
      return putEmployeeData(data);
    })
    .then(data => {
      console.log(`\nUpdated ${data.data.full_name} to have the role of ${data.data.title}.\n`);
      return taskPrompt();
    });
};

async function editEmployeeManager() {
  const employees = await getAllEmployees();
  const employeeChoices = generateChoicesArray("full_name", employees.data);

  const employeeResponse = await inquirer.prompt([
    {
      type: "list",
      name: "employee_name",
      message: "Which employee would you like to update?",
      choices: employeeChoices
    }
  ]);
  
  const managerResponse = await inquirer.prompt([
    {
      type: "list",
      name: "manager_name",
      message: "Who is this employee's manager?",
      choices: ["None", ...employeeChoices.filter(employee => employee !== employeeResponse.employee_name)]
    }
  ]);

  const requestObj = {
    employee_name: employeeResponse.employee_name,
    manager_name: managerResponse.manager_name,    
    id: employees.data.filter(employee => employee.full_name === employeeResponse.employee_name)[0].id,
    manager_id: (managerResponse.manager_name === "None") ? null: employees.data.filter(employee => employee.full_name === managerResponse.manager_name)[0].id
  };
  
  return putEmployeeData(requestObj)
    .then(data => {
      console.log(`\nUpdated ${data.data.employee_name} to have ${(data.data.manager_id) ? data.data.manager_name: "nobody"} as a manager.\n`);
      return taskPrompt();
    });
};

async function removeDepartment() {
  const departments = await getAllDepartments();

  return inquirer.prompt([
    {
      type: "list",
      name: "name",
      message: "Which department would you like to remove?",
      choices: generateChoicesArray('name', departments.data)
    }
  ])
    .then(data => {
      data.id = departments.data.filter(department => department.name === data.name)[0].id;
      return deleteDepartment(data);
    })
    .then(data => {
      console.log(`\nRemoved ${data.name} from the departments table.\n`);
      return taskPrompt();
    });
};

async function removeRole() {
  const roles = await getAllRoles();

  return inquirer.prompt([
    {
      type: "list",
      name: "title",
      message: "Which role would you like to remove?",
      choices: generateChoicesArray('title', roles.data)
    }
  ])
    .then(data => {
      data.id = roles.data.filter(role => role.title === data.title)[0].id;
      return deleteRole(data);
    })
    .then(data => {
      console.log(`\nRemoved ${data.title} from the roles table.\n`);
      return taskPrompt();
    });
};

async function removeEmployee() {
  const employees = await getAllEmployees();

  return inquirer.prompt([
    {
      type: "list",
      name: "full_name",
      message: "Which employee would you like to remove?",
      choices: generateChoicesArray('full_name', employees.data)
    }
  ])
    .then(data => {
      data.id = employees.data.filter(employee => employee.full_name === data.full_name)[0].id;
      return deleteEmployee(data);
    })
    .then(data => {
      console.log(`\nRemoved ${data.full_name} from the employee table.\n`);
      return taskPrompt();
    });
};

initialize();