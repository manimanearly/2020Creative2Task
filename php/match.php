<?php

require_once('common.php');
$user = $_GET['id'];
$result = "player1";
$rooom = -1;
$data = getDB('select * from matchroom where pass is null and player2 is null order by id asc limit 1');

if($data == null) {
    getDB('insert into matchroom(player1) values(?)', [$user]);
    $room = getDB('select id from matchroom where player1=?', [$user])['id'];
}
else{
    getDB('update matchroom set player2=? where id=?', [$user, $data['id']]);
    $result = "player2";
    $room = $data['id'];
}

echo json_encode([
    'num' => $result,
    'roomid' => $room
]);

?>