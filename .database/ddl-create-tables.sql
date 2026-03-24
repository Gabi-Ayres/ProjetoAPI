create database projeto_api;
use projeto_api;

     -- CRIAÇÃO DE CADA TABELA
-- ====================================
create table users (
id int primary key auto_increment,
name varchar(100) not null, 
email varchar(100) not null unique,
active boolean not null default true
);

create table tags (
id int primary key auto_increment,
name varchar(50) not null unique
);

create table tasks (
id int primary key auto_increment,
title varchar(100) not null,
categoria varchar(50),
completed boolean not null default false,
data_conclusao datetime default null,
user_id int not null,
foreign key(user_id) references users(id) on delete restrict
);

create table task_tag (
task_id int not null,
tag_id int not null,
foreign key(task_id) references tasks(id) on delete cascade,
foreign key(tag_id) references tags(id) on delete cascade,
primary key (task_id, tag_id)
);

create table comments (
id int primary key auto_increment,
content text not null,
data_criacao datetime default current_timestamp,
user_id int,
task_id int, 
foreign key(user_id) references users(id) on delete cascade,
foreign key(task_id) references tasks(id) on delete cascade
);

        -- INSERTS DAS TABELAS
-- ====================================

INSERT INTO users (name, email) VALUES
('Lucas Ayres', 'lucas@email.com'),
('Bianca Ayres', 'bianca@email.com'),
('Enos Ayres', 'enos@email.com');

INSERT INTO tags (name) VALUES
('backend'),
('frontend'),
('urgente'),
('estudos');

INSERT INTO tasks (title, categoria, completed, data_conclusao, user_id) VALUES
('Estudar Node', 'Estudos', false, NULL, 1),
('Criar API', 'Trabalho', true, '2026-03-20 10:30:00', 2),
('Revisar SQL', 'Estudos', false, NULL, 1);

INSERT INTO task_tag (task_id, tag_id) VALUES
(1, 1),
(1, 4),
(2, 1),
(2, 3),
(3, 4);

INSERT INTO comments (content, user_id, task_id) VALUES
('Vou começar hoje', 1, 1),
('API finalizada', 2, 2),
('Preciso rever joins', 3, 3);