<?php

require_once('common.php');
$user = $_GET['id'];
$result = false;
$data = getDB('select * from matchroom where player1=?',[$user]);

if($data['player2'] != null) {
    $result = true;
}

echo json_encode([
    'result' => $result
]);

?>