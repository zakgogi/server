TRUNCATE users, habits RESTART IDENTITY;

INSERT INTO users (username, email, password) 
VALUES
('Test User 1', 'testuser1@test.com', 'testtesttest1'),
('Test User 2', 'testuser2@test.com', 'testtesttest2');

INSERT INTO habits (habitname, times_completed, frequency_day, streak, username_id) 
VALUES
    ('Go to the gym', 0, 2, 15, 1),
    ('Read a book', 1, 5, 2, 1),
    ('Go for a walk', 1, 3, 3, 2);