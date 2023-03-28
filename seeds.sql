INSERT INTO department (name)
VALUES  ('General Manager'),
        ('Hitting Coach'),
        ('Pitching Coach'),
        ('InFielder Coach'),
        ('OutFielder Coach'),
        ('First Baseman'),
        ('Second Baseman'),
        ('SS'),
        ('Third Baseman'),
        ('Left Fielderer'),
        ('Center Fielderer'),
        ('Right Fielderer'),
        ('Catcher'),
        ('Pitcher');

INSERT INTO role (title, salary, department_id)
VALUES  ('General Manager', 800000, 1),
        ('Catching Coach', 150000, 2),
        ('Pitching Coach', 200000, 3),
        ('InFielder Coach', 100000, 4),
        ('OutFielder Coach', 120000, 5),
        ('First Baseman', 4100000, 6), 
        ('Second Baseman',900000, 7),
        ('SS', 10000000, 8),
        ('Third Baseman', 11000000, 9),
        ('Left Fielder', 706000, 10),
        ('Center Fielder',40000000, 11),
        ('Right Fielder', 900000, 12),
        ('Catcher', 700000, 13),
        ('Pitcher',4200000, 14);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Scott', 'Servais', 1, NULL);
        
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Tony', 'Arnerich', 2, 1),
        ('Pete', 'Woodworth', 3, 1),
        ('Perry', 'Hill', 4, 1),
        ('Casrson', 'Vitale', 5, 1),
        ('Ty', 'France', 6, 4),
        ('Sam', 'Haggarty', 7, 4),
        ('JP', 'Crawford', 8, 4),
        ('Eugenio', 'Suarez', 9, 4),
        ('Jared', 'Kelenic', 10, 5),
        ('Julio', 'Rodriguez', 11, 5),
        ('Kole', 'Calhoun', 12, 5),
        ('Cal', 'Raleigh', 13, 1),
        ('Luis', 'Castillo', 14, 2);





