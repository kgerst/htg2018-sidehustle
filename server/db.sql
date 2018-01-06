CREATE TABLE users (
  id serial primary key not null,
  name varchar (300) not null,
  last_name varchar (300) not null,
  password varchar (200), -- authentication?
  email varchar (500),
  bio varchar (400) not null,
  compensation varchar (100), -- 3 options
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  open boolean default TRUE,--boolean true false
  token varchar (100) default '',
  expires timestamp default now()
);

CREATE TABLE levels (
  id serial primary key not null,
  level int not null,
  descript varchar (100)
);

CREATE TABLE skills (
  id serial primary key not null,
  skill varchar (100) not null
);

CREATE TABLE projects (
  id serial primary key not null,
  name varchar (100),
  description varchar (500) not null,
  numteam int not null,
  currentnumteam int default 0,
  projectTime int,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  compensation varchar (100)
);

CREATE TABLE users_levels (
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  level_id INT REFERENCES levels(id) ON DELETE CASCADE
);

CREATE TABLE projects_levels (
  project_id INT REFERENCES projects(id) ON DELETE CASCADE,
  level_id INT REFERENCES levels(id) ON DELETE CASCADE
);

CREATE TABLE users_projects(
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  project_id INT REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE project_skills(
  project_id INT REFERENCES projects(id) ON DELETE CASCADE,
  skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
  proficiency int not null default 0 --(1-5)
);

CREATE TABLE user_skills(
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
  proficiency int not null default 0 --(1-5)
);