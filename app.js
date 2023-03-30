const mysql = require("mysql2");
const DatabaseQueries = require("./queries");
const dbConfig = require("./db");
const connection = mysql.createConnection(dbConfig);
const dbQueries = new DatabaseQueries(connection);
const inquirer = require("inquirer");
const consoleTable = require("console.table");

function promptUser() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((response) => {
      switch (response.action) {
        case "View all departments":
          dbQueries
            .viewRoles()
            .then((results) => {
              const formattedResults = results.map((result) => ({
                id: result.id,
                department: result.department,
              }));

              console.table(formattedResults);
              promptUser();
            })
            .catch((error) => console.error(error));
          break;
        case "View all roles":
          dbQueries
            .viewRoles()
            .then((results) => {
              const formattedResults = results.map((result) => ({
                id: result.id,
                title: result.title,
                salary: result.salary,
                department: result.department,
              }));

              console.table(formattedResults);
              promptUser();
            })
            .catch((error) => console.error(error));
          break;
        case "View all employees":
          dbQueries
            .viewEmployees()
            .then((results) => {
              const formattedResults = results.map((result) => ({
                id: result.id,
                first_name: result.first_name,
                last_name: result.last_name,
                department: result.department,
                salary: result.salary,
                manager_id: result.manager_id,
              }));

              console.table(formattedResults);
              promptUser();
            })
            .catch((error) => console.error(error));
          break;
        case "Add a department":
          inquirer
            .prompt([
              {
                type: "input",
                name: "departmentName",
                message: "Enter the name of the new department:",
              },
            ])
            .then((response) => {
              dbQueries
                .addDepartment(response.departmentName)
                .then(() => {
                  console.log("Department added successfully.");
                  promptUser();
                })
                .catch((error) => console.error(error));
            });
          break;
        case "Add a role":
          dbQueries.viewDepartments().then((departments) => {
            inquirer
              .prompt([
                {
                  type: "input",
                  name: "roleTitle",
                  message: "Enter the title of the new role:",
                },
                {
                  type: "number",
                  name: "roleSalary",
                  message: "Enter the salary of the new role:",
                },
                {
                  type: "list",
                  name: "roleDepartment",
                  message: "Select the department of the new role:",
                  choices: departments.map((department) => ({
                    name: department.name,
                    value: department.id,
                  })),
                },
              ])
              .then((response) => {
                dbQueries
                  .addRole(
                    response.roleTitle,
                    response.roleSalary,
                    response.roleDepartment
                  )
                  .then(() => {
                    console.log("Role added successfully.");
                    promptUser();
                  })
                  .catch((error) => console.error(error));
              });
          });
          break;
        case "Add an employee":
          Promise.all([dbQueries.viewRoles(), dbQueries.viewEmployees()]).then(
            ([roles, managers]) => {
              inquirer
                .prompt([
                  {
                    type: "input",
                    name: "employeeFirstName",
                    message: "Enter the first name of the new employee:",
                  },
                  {
                    type: "input",
                    name: "employeeLastName",
                    message: "Enter the last name of the new employee:",
                  },
                  {
                    type: "list",
                    name: "employeeRole",
                    message: "Select the role of the new employee:",
                    choices: roles.map((role) => ({
                      name: `${role.title} (${role.department})`,
                      value: role.id,
                    })),
                  },
                  {
                    type: "list",
                    name: "employeeManager",
                    message: "Select the manager of the new employee:",
                    choices: [
                      { name: "None", value: null },
                      ...managers.map((manager) => ({
                        name: `${manager.first_name} ${manager.last_name}`,
                        value: manager.id,
                      })),
                    ],
                  },
                ])
                .then((response) => {
                  dbQueries
                    .addEmployee(
                      response.employeeFirstName,
                      response.employeeLastName,
                      response.employeeRole,
                      response.employeeManager
                    )
                    .then(() => {
                      console.log("Employee added successfully.");
                      promptUser();
                    })
                    .catch((error) => console.error(error));
                });
            }
          );
          break;
        case "Update an employee role":
          Promise.all([dbQueries.viewEmployees(), dbQueries.viewRoles()])
            .then(([employees, roles]) => {
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "employeeToUpdate",
                    message: "Select an employee to update:",
                    choices: employees.map((employee) => ({
                      name: `${employee.first_name} ${employee.last_name}`,
                      value: employee.id,
                    })),
                  },
                  {
                    type: "list",
                    name: "newRole",
                    message: "Select the employee's new role:",
                    choices: roles.map((role) => ({
                      name: `${role.title} (${role.department})`,
                      value: role.id,
                    })),
                  },
                ])
                .then((response) => {
                  dbQueries
                    .updateEmployeeRole(
                      response.employeeToUpdate,
                      response.newRole
                    )
                    .then(() => {
                      console.log("Employee role updated successfully.");
                      promptUser();
                    })
                    .catch((error) => console.error(error));
                });
            })
            .catch((error) => console.error(error));
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

connection.connect((error) => {
  if (error) {
    console.error(`error connecting to the database : ${error.stack}`);
    return;
  }

  console.log(`Connect to the database as ID ${connection.threadId}`);

  promptUser();
});
