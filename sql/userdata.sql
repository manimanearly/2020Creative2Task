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