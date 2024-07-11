<?php

$servername="localhost";
$username="deffocom_libros_cac";
$password="final24145";
$dbname="deffocom_libros_cac";

try
{
    $conn = new PDO("mysql:host=$servername;dbname=$dbname",$username,$password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Conexión exitosa!";
}
catch(PDOException $e)
{
    echo "Conexión no válida: ".$e->getMessage();
}


?>