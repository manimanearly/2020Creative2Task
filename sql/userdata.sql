create database if not exists 2020FRONT1541;

USE 2020FRONT1541;

create table user(
	playerID int UNIQUE NOT NULL
);

create table matchroom(
	id int AUTO_INCREMENT,
	player1 int UNIQUE,
	player2 int UNIQUE,
	pass varchar(10),
	PRIMARY KEY(id)
);

create table playroom2(
	room_id int AUTO_INCREMENT,
	player1_id int,
	player2_id int,
	searcher_id int,
	turn_player int,
	choice_num int,
	conseal_num int,
	open_count int not null,
	update_end boolean not null,
	PRIMARY KEY(room_id)
);