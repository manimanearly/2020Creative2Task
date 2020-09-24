<?php

require_once('common.php');
$user = $_GET['user'];

getDB('delete from matchroom where player1=? or player2=?', [$user, $user]);
getDB('delete from playroom where player1_id=? or player2_id=?', [$user, $user]);
getDB('delete from user where playerID=?', [$user]);

?>