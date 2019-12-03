SELECT p.*, h.username, h.image
FROM helo_posts AS p
JOIN helo_users AS h
ON p.user_id = h.user_id
WHERE title = $1;