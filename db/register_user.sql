INSERT INTO helo_users (username, password, image)
VALUES ($1, $2, $3)
RETURNING *;