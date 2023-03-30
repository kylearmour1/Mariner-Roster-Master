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

  addDepartment(name) {
    return this._query("INSERT INTO department (name) VALUES (?)", [name]);
  }

  addRole(title, salary, department_id) {
    return this._query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [title, salary, department_id]
    );
  }

  addEmployee(first_name, last_name, role_id, manager_id) {
    return this._query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [first_name, last_name, role_id, manager_id]
    );
  }

  updateEmployeeRole(employeeId, newRoleId) {
    return this._query("UPDATE employee SET role_id = ? WHERE id = ?", [
      newRoleId,
      employeeId,
    ]);
  }
}

module.exports = DatabaseQueries;
