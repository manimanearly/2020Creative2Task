<?php

require_once('common.php');
$id = $_GET['user'];

$room_id = getDB('select room_id from playroom where player1_id=? or player2_id=?', [$id, $id])['room_id'];

echo json_encode([
    'room_id' => $room_id
]);

?>