DROP TABLE tasks;

CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    isCompleted BOOLEAN NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL,
    userOwner VARCHAR(255) NOT NULL
);

-- Insert some tasks for testing

INSERT INTO tasks (name, description, isCompleted, createdAt, userOwner) VALUES ('work', 'complete the project report', 0, '2024-06-07T13:30', 'test');
INSERT INTO tasks (name, description, isCompleted, createdAt, userOwner) VALUES ('exercise', 'go for a run', 0, '2024-06-07T13:30', 'test');
INSERT INTO tasks (name, description, isCompleted, createdAt, userOwner) VALUES ('meetings', 'attend team meeting', 0, '2024-06-07T13:30', 'test');
INSERT INTO tasks (name, description, isCompleted, createdAt, userOwner) VALUES ('cleaning', 'tidy up the house', 0, '2024-06-07T13:30', 'test');
INSERT INTO tasks (name, description, isCompleted, createdAt, userOwner) VALUES ('grocery shopping', 'buy groceries for the week', 0, '2024-06-07T13:30', 'test');
INSERT INTO tasks (name, description, isCompleted, createdAt, userOwner) VALUES ('study', 'review for the upcoming exam', 0, '2024-06-07T13:30', 'test');
INSERT INTO tasks (name, description, isCompleted, createdAt, userOwner) VALUES ('cooking', 'prepare dinner', 0, '2024-06-07T13:30', 'test');
INSERT INTO tasks (name, description, isCompleted, createdAt, userOwner) VALUES ('reading', 'finish the novel', 0, '2024-06-07T13:30', 'test');
