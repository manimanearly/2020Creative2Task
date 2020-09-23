<?php

require_once('common.php');
$update_content = mb_substr($_GET['update'], 1, -1);
$room = $_GET['room_id'];

$set1 = 'update playroom set ';
$set2 = ' where room_id=';

$result = getDB('update playroom set '. $update_content .' where room_id=' . $room);

echo json_encode([
    'result' => 'update playroom set '. $update_content .' where room_id=' . $room
]);

?>