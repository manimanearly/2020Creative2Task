<?php

require_once('common.php');
$room = $_GET['room_id'];
$user = $_GET['user'];
$data = getDB('select * from playroom where room_id=?', [$room]);
$rival = (($data['player1_id'] == $user) ? $data['player2_id'] : $data['player1_id']);

echo json_encode([
    'rival' => $rival,
    'searcher' => $data['searcher_id'],
    'turn' => $data['turn_player'],
    'choice' => $data['choice_num'],
    'conseal' => $data['conseal_num'],
    'open_count' => $data['open_count'],
    'update_end' => $data['update_end'],
    'bool' => $data['player1_id'] == $user
]);

?>