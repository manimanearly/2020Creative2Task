<?php

require_once('common.php');
$user = $_GET['id'];
$room = $_GET['room_id'];
$data = getDB('select * from playdatas where room_id=?', [$room]);

if($data['turn_p'] == $user){
    
}

?>