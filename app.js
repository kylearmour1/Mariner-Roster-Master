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
            
          break;
        case "View all roles":
          break;
        case "View all employees":
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
