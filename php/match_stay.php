<?php

require_once('common.php');
$user = $_GET['id'];
$result = false;
$data = getDB('select player2 from matchroom where player1=?',[$user]);

if($data != null) {
    $result = true;
}

echo json_encode([
    'result' => $result
]);

?>