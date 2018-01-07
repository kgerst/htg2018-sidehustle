-- TODO: update postgres version to use row_to_json

-- GET user profile
SELECT concat(u.name, ' ', u.last_name) AS name, u.email, u.bio, u.compensation,
  array_agg((SELECT skill FROM skills s WHERE s.id = us.skill_id)) AS skills,
  array_agg((SELECT distinct descript from levels l where l.level = ul.level_id)) as level
  FROM users AS u
  join user_skills us on u.id = us.user_id
  join users_levels ul on u.id = ul.user_id
  where u.id = 1
  group by u.name, u.last_name, u.bio, u.compensation, u.email
;


-- GET projects
SELECT
p.*,
(SELECT descript FROM levels l WHERE l.level = p.projecttime) AS time,
array_agg((SELECT skill FROM skills s WHERE s.id = ps.skill_id)) AS skills,
array_agg(ps.proficiency) AS skill_proficiencies
FROM projects p
JOIN projects_levels pl ON p.id = pl.project_id
JOIN project_skills ps ON p.id = ps.project_id
JOIN user_skills us ON ps.skill_id = us.skill_id
WHERE us.user_id = 1
AND us.proficiency >= ps.proficiency
GROUP BY p.id