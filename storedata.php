<?php 

include 'dbinfo.php';

try
{
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepase("SELECT * FROM users")
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_ASSOC); 
    $result = $stmt->fetch();
}
catch(PDOException $e)
{
    echo $e->GetMessage();
}

$conn = null;
echo json_decode($result);

?>