<?php

require_once('common.php');
$user = $_GET['id'];
$result = "player1";
$data = getDB('select * from matchroom where pass is null and player2 is null order by id asc limit 1');

if($data == null) {
    getDB('insert into matchroom(player1) values(?)', [$user]);
}
else{
    getDB('update matchroom set player2=? where id=?', [$user, $data['id']]);
    $result = "player2";
}

echo json_encode([
    'num' => $result,
]);

?>