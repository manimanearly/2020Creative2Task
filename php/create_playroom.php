<?php

require_once('common.php');
$match_id = $_GET['room_id'];
$player_id = $_GET['player_id'];
$data = getDB('select * from matchroom where id=?', [$match_id]);

getDB('insert into playroom(player1_id, player2_id, searcher_id, turn_player) values(?, ?, ?, ?)', [$data['player1'], $data['player2'], (mt_rand(1, 2) == 1 ? $data['player1'] : $data['player2']), (mt_rand(1, 2) == 1 ? $data['player2'] : $data['player1'])]);

?>