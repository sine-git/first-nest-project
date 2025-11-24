INSERT INTO user (username, email, password, salt) VALUES ('alpha', 'alpha@test.com', 'hashed_password_1', 'salt1'),('bravo', 'bravo@test.com', 'hashed_password_2', 'salt2'),('charlie', 'charlie@test.com', 'hashed_password_3', 'salt3');

INSERT INTO role (`key`, `name`, `description`) VALUES ('ADMIN',   'Administrateur', 'A tous les privilèges'),('MANAGER', 'Manager',        'Gère certaines ressources'),('CLIENT',  'Client',         'Utilisateur classique');

INSERT INTO user_role (user_id, role_id) VALUES (1, 1),(1, 2),(2, 2),(3, 3); 