<?php

include_once '../app/controllers/headers.php';

class login extends Controller{

    public function check(){

        $this->model = $this->model('login_mdl');
        $data = json_decode(file_get_contents("php://input"));

        $this->model->uuid = $data->uuid;

        $response = $this->model->checkuuid();
        
        $data = [];
        array_push($data,$response);
        echo json_encode($data);
    }
}