<?php
class Connection {
   private $servername ;
   private $username;
   private $password;
   private $dbname;

    protected function connect(){
        $this->servername="localhost";
        $this->username="root";
        $this->password="";
        $this->dbname="rondevo";
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname); 
        return $conn; 
    }
   
}
