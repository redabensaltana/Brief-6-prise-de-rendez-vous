<?php
require_once '../app/core/Connection.php';

class reservation_mdl extends Connection
{
    //db stuff
    private $table = 'reservation';

    //table columns
    public $id;
    public $date;
    public $slot;
    public $uuid;

    public function show()
    {
        $query = "SELECT * FROM " . $this->table . ";";
        $data = $this->connect()->query($query);
        $rows_num = $data->num_rows;
        $reservations_arr = [];

        if ($rows_num > 0) {
            while ($row = $data->fetch_assoc()) {
                array_push($reservations_arr, $row);
            }
        }
        return $reservations_arr;
    }

    public function displaydayslots(){
        $query1 = "SELECT slot FROM " . $this->table . " WHERE date='$this->date';"; 
        $data = $this->connect()->query($query1);
        $rows_num = $data->num_rows;
        $unavailable_slots = [];
        
        if($rows_num > 0){
            while ($row = $data->fetch_assoc()){
                array_push($unavailable_slots, $row["slot"]);
            }
        }
        return $unavailable_slots;
    }

    public function reserve()
    {  
        $query = "INSERT INTO " . $this->table . " (date,slot,uuid) VALUES ('$this->date','$this->slot','$this->uuid');";
        $this->connect()->query($query);
    }

    public function update()
    {
        $query = "UPDATE " . $this->table . " SET date = '$this->date' , slot = '$this->slot', uuid = '$this->uuid' WHERE id = '$this->id';";
        $this->connect()->query($query);
    }

    public function cancel()
    {
        $query = "DELETE FROM " . $this->table . " WHERE id = '$this->id';";
        $this->connect()->query($query);
    }
}
