<?php

require_once '../app/core/Connection.php';

class registration_mdl extends Connection{
   
    private $table = "user";

    public $uuid;
    public $fname;
    public $lname;
    public $bdate;

    public function register(){
        $query = "INSERT INTO " . $this->table . " (uuid,fname,lname,bdate) Values ('$this->uuid','$this->fname','$this->lname','$this->bdate');";
        $this->connect()->query($query);
    }
}