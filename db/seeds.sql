INSERT INTO departments (name)
VALUES
    ('Quality Control'),
    ('Eligibility and Assessment'),
    ('TOS');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('FA Counselor II', 36000, 1),
    ('FA Counselor II', 36000, 2),
    ('1403 Team Member', 40000, 2),
    ('Front Counter', 25000, 3),
    ('Consortium Person', 40000, 1),
    ('FA Counselor III', 50000, 1),
    ('FA Counselor III', 50000, 2),
    ('AD', 75000, 1);

INSERT INTO employees (first_name, last_name, role_id)
VALUES
    ('Christine', 'Christineson', 8),
    ('Kevin', 'Lam', 5),
    ('Christy', 'Man', 6),
    ('Rolando', 'Nino', 1),
    ('Selena', 'Montes', 1),
    ('Hector', 'Ramirez', 1),
    ('Allison', 'Radke', 8),
    ('Talyn', 'Bourke', 7),
    ('Holly', 'Weir', 7),
    ('Giblert', 'Rios', 3),
    ('Lily', 'Green', 3),
    ('Emily', 'Edelman', 3),
    ('Denise', 'Carlos', 2),
    ('Ty', 'Davis', 2),
    ('Danielle', 'Kaplan', 8),
    ('Cetricia', 'Rockhold', 4),
    ('Amy', 'Downey', 4);


UPDATE employees SET manager_id = 1
WHERE id = 2 OR id = 3;

UPDATE employees SET manager_id = 3
WHERE id = 4 OR id = 5 OR id = 6;

UPDATE employees SET manager_id = 7
WHERE id = 8 OR id = 9;

UPDATE employees SET manager_id = 8
WHERE id = 10 OR id = 11 OR id = 12;

UPDATE employees SET manager_id = 9
WHERE id = 13 OR id = 14;

UPDATE employees SET manager_id = 15
WHERE id = 16 OR id = 17;