<?php
    require_once('common.php');
    $id = mt_rand(100000, 999999);

    if(!getDB('insert into user(playerID) value(?)', $id)){
        $id = mt_rand(100000, 999999);
    }

    
?>