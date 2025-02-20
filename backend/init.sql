CREATE TABLE IF NOT EXISTS tetris_scores (
    id SERIAL PRIMARY KEY,
    player_name TEXT NOT NULL,
    score INTEGER NOT NULL
);