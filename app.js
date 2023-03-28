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
            dbQueries.viewRoles()
      .then(results => {
        
        const formattedResults = results.map(result => ({
          id: result.id,
          title: result.title
        }));
  
        
        console.table(formattedResults);
        promptUser();
      })
      .catch(error => console.error(error));
          break;
        case "View all roles":
            dbQueries.viewRoles()
    .then(results => {
      
      const formattedResults = results.map(result => ({
        id: result.id,
        title: result.title,
        salary: result.salary,
        department: result.department
      }));

      
      console.table(formattedResults);
      promptUser();
    })
    .catch(error => console.error(error));
          break;
        case "View all employees":
            dbQueries.viewEmployees()
            .then(results => {
              
              const formattedResults = results.map(result => ({
                id: result.id,
                first_name: result.first_name,
                last_name: result.last_name,
                department: result.department,
                salary: result.salary,
                manager_id: result.manager_id
              }));
        
              
              console.table(formattedResults);
              promptUser();
            })
            .catch(error => console.error(error));
          break;
        case "Add a department":
          break;
        case "Add a role":
          break;
        case "Add an employee":
          break;
        case "Update an employee role":
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
