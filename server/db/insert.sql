-- KEEP double single quotes

INSERT INTO projects
(name, description)
VALUES
('Internet of Awesome', 'We''re using IoT to solve global warming.'),
('Upcycled Greeting Cards', 'Help us create cute greeting cards using totally upcylced materials.'),
('Zombie fashion show', 'We''re hosting a zombie fashion show for charity. We''re looking for photographers and designers to help create marking assets and shoot the models!'),
('Album art', 'We''re a local band looking for an illustrator to help is with our new album art. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim')
;

INSERT INTO users
(name, last_name, password, email, bio, compensation)
VALUES
('Suzanna', 'Altman', 'qwe123', 's.altman@gmail.com', 'I am a front end developer with loads of experience in JavaScript. I love learing about the IoT and would love to work on a project where I can expand this skillset.', 'Either'),
('Amanda', 'Schlosser', 'qwe123', 'a.schlosser@gmail.com',  'I am an exerpienced designer who loves making cat cards in my free time! I''m looking for projects where I can grow my experience in front end design but would also love contribute my design experience to any projects involving art or cats!', 'Money'),
('Elise', 'Ogden', 'qwe123', 'e.ogden@gmail.com', 'I am a photographer and product person. I enjoy taking portraits most but am als experienced in urban landscapes and event photography. I''d like to contribute my skills to any project with a social mission.', 'Trade'),
('Jessica', 'Oakes', 'qwe123', 'j.oakes@gmail.com', 'I am a backend developer and calligrapher/illustrator. Happy to put my skills to use on any project!', 'Either')
;

--adding skill data
INSERT INTO skills (skill)
VALUES
('Design'),
('Illustration'),
('Development'),
('QA'),
('Photography'),
('Music'),
('Painting')
;

--adding level data
INSERT INTO levels (level, descript)
VALUES
(1, '1-5 hours'),
(2, '5-10 hours'),
(3, '10-20 hours'),
(4, '20+ hours')
;


INSERT INTO user_skills
(user_id, skill_id, proficiency)
VALUES
(1, 1, 3),
(1, 3, 5),
(2, 7, 4),
(2, 1, 5),
(2, 6, 1),
(3, 4, 2),
(3, 1, 3),
(3, 5, 5),
(4, 2, 3),
(4, 3, 4)
;

INSERT INTO project_skills
(project_id, skill_id, proficiency)
VALUES
(1, 1, 3),
(1, 3, 5),
(2, 7, 4),
(2, 1, 5),
(2, 6, 1),
(3, 4, 2),
(3, 1, 3),
(3, 5, 5),
(4, 2, 3),
(4, 3, 4)
;
