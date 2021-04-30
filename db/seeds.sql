INSERT INTO departments (name)
VALUES
    ('Jedi'),
    ('Sith'),
    ('Galactic Senate');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Jedi Counsel Member', 10000, 1),
    ('Jedi Knight', 5000, 1),
    ('Padawan', 0, 1),
    ('Sith Lord', 99999999, 2),
    ('Sith Apprentice', 999999, 2),
    ('Chancellor', 1000000, 3),
    ('Senator', 100000, 3);

INSERT INTO employees (first_name, last_name, role_id)
VALUES
    ('Sheev', 'Palpatine', 6),
    ('Padme', 'Amidala', 7),
    ('Bail', 'Organa', 7),
    ('Anakin', 'Skywalker', 2),
    ('Obi-Wan', 'Kenobi', 1),
    ('Qui-Gon', 'Jinn', 1),
    ('Mace', 'Windu', 1),
    ('Ahsoka', 'Tano', 3),
    ('Darth', 'Maul', 5);


UPDATE employees SET manager_id = 1
WHERE id = 2 OR id = 3;

UPDATE employees SET manager_id = 5
WHERE id = 4;

UPDATE employees SET manager_id = 6
WHERE id = 5;

UPDATE employees SET manager_id = 4
WHERE id = 8;