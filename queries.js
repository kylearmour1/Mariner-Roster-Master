class DatabaseQueries {
    constructor(connection) {
      this.connection = connection;
    }
  
    _query(query, params) {
      return new Promise((resolve, reject) => {
        this.connection.query(query, params, (error, results) => {
          if (error) reject(error);
          resolve(results);
        });
      });
    }
  
    viewDepartments() {
      return this._query("SELECT * FROM department");
      
    }
    viewRoles() {
        return this._query(`
          SELECT role.id, role.title, role.salary, department.name AS department
          FROM role
          INNER JOIN department ON role.department_id = department.id
          ORDER BY role.id;
        `);
      }
    
      viewEmployees() {
        return this._query(`
          SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.salary, employee.manager_id
          FROM employee
          INNER JOIN role ON employee.role_id = role.id
          INNER JOIN department ON role.department_id = department.id
          ORDER BY employee.id;
        `);
      }


}


    module.exports = DatabaseQueries;