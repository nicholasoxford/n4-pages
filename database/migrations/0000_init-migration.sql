-- Migration number: 0000 	 2023-10-29T04:27:22.375Z
CREATE TABLE IF NOT EXISTS databases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    user_id INTEGER NOT NULL,
    size INTEGER,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    host TEXT,
    port INTEGER,
    db_type TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS databases_user_id_index ON databases (user_id);