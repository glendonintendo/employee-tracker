# Employee Tracker <!-- omit in toc -->
- [Description](#description)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Demo](#demo)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
## Description
The Employee Tracker is a command line application that prompt the user to view, add, update, and delete data from an employees database. 
## Technologies Used
- inquirer: used to prompt the user with questions and get data objects to send to server
- express: used to create and implement a local server
- dotenv: used to hide private login information for mysql
- console.table: used to create prettier tables in the command line
- mysql: used for database management
- node-fetch: used to fetch apis from node
- nodemon: used to automatically reload server when server files have been edited (dev)

## Usage
The application uses mysql, so it is required to have my ql installed before attempting the next steps.

To create your database and table, run `SOURCE db/db.sql;` and `SOURCE db/schema.sql` from mysql. To populate the table with test data, `SOURCE db/seeds.sql` can be used as well.

From the command line, start the server with the command `npm start`. Then, from a separate command line, use the command `node index.js` to start the application.
## Demo
A demo video of my deployed application can be found [here](https://www.youtube.com/watch?v=vsWZeFcuSV4).

My data tables are structured similar to the diagram below:
![](assets/12-sql-homework-demo-02.png)
## User Story
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```
## Acceptance Criteria
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