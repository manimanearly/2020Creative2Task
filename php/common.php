<?php
$dsn = 'mysql:dbname=2020FRONT1541;host=localhost';
$user = 'senpai';
$pw = 'indocurry';

function getDB($sql, $param = []){
    $dbh = new PDO($dsn, $user, $pw);
    $sth = $dbh->prepare($sql);
    $sth->execute($param);
    return ($sth->fetch(PDO::FETCH_ASSOC));
}

?>