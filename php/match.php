<?php

require_once('common.php');
$data = getDB('select count(pass!=null or null) from room');

if($data == 0){
    
}

?>