# Employee Tracker <!-- omit in toc -->
- [Description](#description)
- [Technologies Used](#technologies-used)
- [Installation, Usage, and Tests](#installation-usage-and-tests)
- [Demo](#demo)
- [Submission Requirements](#submission-requirements)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Grading Criteria](#grading-criteria)
## Description

## Technologies Used
- inquirer
- express
- dotenv
- async queries [here](https://www.npmjs.com/package/mysql2)
- console.table [here](https://www.npmjs.com/package/console.table)
- jest
- nodemon
- mysql
## Installation, Usage, and Tests

## Demo
![](assets/12-sql-homework-demo-02.png)
## Submission Requirements
### User Story
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```
### Acceptance Criteria
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```
### Grading Criteria
#### Deliverables - 10% <!-- omit in toc -->
- [ ] GitHub repo containing application code
#### Walkthrough Video - 27% <!-- omit in toc -->
- [ ] Demonstrates functionality of Employee Tracker
- [ ] Link to video included in project README
- [ ] Shows all technical acceptance criteria being met
- [ ] Demonstrates how user would invoke app from command line
- [ ] Demonstrates functional menu with options outlined in acceptance criteria
#### Technical Acceptance Criteria - 40% <!-- omit in toc -->
- [ ] Uses Inquirer, MySQL2, and console.table packages
- [ ] Follows table schema
  - [ ] Department:
    - [ ] id: INT PRIMARY KEY
    - [ ] name: VARCHAR(30) to hold department name
  - [ ] Role:
    - [ ] id: INT PRIMARY KEY
    - [ ] title: VARCHAR(30) to hold the role title
    - [ ] salary: DECIMAL to hold role salary
    - [ ] department_id: INT to hold reference to department role belongs to
  - [ ] Employee:
    - [ ] id: INT PRIMARY KEY
    - [ ] first_name: VARCHAR(30) to hold employee last name
    - [ ] role_id: INT to hold reference to employee role
    - [ ] manager_id: INT to hold reference to another employee that is manager of current employee (may be null if no manager)
- [ ] User presented with options:
  - [ ] View all departments: table showing department names and department ids
  - [ ] View all roles: table with job title, role id, department that role belongs to, and salary
  - [ ] View all employees: table with employees ids, first names, last names, job titles, departments, salaries, and managers that employee reports to
  - [ ] Add department: enter name and then department is populated to department table
  - [ ] Add role: enter name, salary, and department is populated to role table
  - [ ] Add employee: enter first name, last name, role, and manager is populated to employee table
  - [ ] Update employee role: select employee, enter new role, update employee table
- [ ] Bonus:
  - [ ] User may update employee managers
  - [ ] User may view employees by manager
  - [ ] User may view employees by department
  - [ ] User may delete departments, role, and employees
  - [ ] User may view combined salaries of all employees in a department
#### Repository Quality - 13% <!-- omit in toc -->
- [ ] Has a unique name
- [ ] Follows best practices for file structure and naming conventions
- [ ] Follows best practices for class/id naming conventions, indentation, quality comments, etc.
- [ ] Contains multiple descriptive commit messages
- [ ] Contains a high-quality README with description and link to walkthrough video
#### Application Quality - 10% <!-- omit in toc -->
- [ ] User experience is intuitive and easy to navigate