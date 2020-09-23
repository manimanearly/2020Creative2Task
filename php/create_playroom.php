<?php

require_once('common.php');
$match_id = $_GET['room_id'];
$player_id = $_GET['player_id'];
$data = getDB('select * from matchroom where id=?', [$match_id]);

$searcher = mt_rand(1, 2) == 1 ? $data['player1'] : $data['player2'];
$turn_p = $searcher == $data['player1'] ? $data['player2'] : $data['player1'];

getDB('insert into playroom(player1_id, player2_id, searcher_id, turn_player, open_count, update_end) values(?, ?, ?, ?, 0, false)', [$data['player1'], $data['player2'], $searcher, $turn_p]);

?>