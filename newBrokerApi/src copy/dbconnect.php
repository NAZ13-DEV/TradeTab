<?php
class dbconnect{

private PDO $connection;
  public function  __construct(private string $db, private string $host,  private string $user, private string $password)
{

}
 
public function getDbconnect() :PDO
{
  $dbc = "mysql:host={$this->host};dbname={$this->db}; charset-utf8";
 $this->connection =  new PDO($dbc, $this->user, $this->password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
 return $this->connection;
}

public function query($sql) {
  return $this->connection->query($sql);
}
public function exec($sql) {
  return $this->connection->exec($sql);
}

// public function prepare($sql){
//   return $this->connection->prepare($sql);
// }

}