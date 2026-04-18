#! /usr/bin/env node
const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id         INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(100) NOT NULL,
  last_name  VARCHAR(100) NOT NULL,
  username   VARCHAR(255) NOT NULL UNIQUE,
  password   TEXT NOT NULL,
  is_member  BOOLEAN NOT NULL DEFAULT FALSE,
  is_admin   BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
  id         INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title      VARCHAR(255) NOT NULL,
  text       TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  user_id    INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (first_name, last_name, username, password, is_member)
VALUES
  ('Alice', 'Smith', 'alice99', 'hashedpassword1', TRUE),
  ('Bob', 'Jones', 'bob_1337', 'hashedpassword2', FALSE),
  ('Carol', 'White', 'carol_w', 'hashedpassword3', TRUE)
ON CONFLICT (username) DO NOTHING;

INSERT INTO messages (title, text, user_id)
VALUES
  ('Hello World', 'This is my first message!', 1),
  ('Secret Club Stuff', 'Members only content here.', 2),
  ('Just Browsing', 'Not a member yet but lurking.', 3),
  ('Another Post', 'Carol here with another message.', 3)
ON CONFLICT DO NOTHING;
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.argv[2],
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
