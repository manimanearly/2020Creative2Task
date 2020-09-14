<?php
    
require_once('common.php');
$id = mt_rand(100000, 999999);

while(getDB('select count(playerID=? or null) as num from user', [$id])['num'] > 0){
    $id = mt_rand(100000, 999999);
}

getDB('insert into user(playerID) value(?)', [$id]);

echo json_encode([
    'user_id' => $id
]);

?>