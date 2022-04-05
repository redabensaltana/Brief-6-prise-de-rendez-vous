<?php

require_once '../app/core/Connection.php';

class login_mdl extends Connection{
   
    private $table = "user";

    public $uuid;

    public function checkuuid(){
        $query = "SELECT uuid FROM " . $this->table . " WHERE uuid='$this->uuid';";
        $result = $this->connect()->query($query);
        $rows_num = $result->num_rows;
        if($rows_num > 0){
            return true;
        }elseif($rows_num == 0){
            return false;
        }
    }
}