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
      
    }}


    module.exports = DatabaseQueries;