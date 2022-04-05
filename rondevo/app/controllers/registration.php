<?php

include_once '../app/controllers/headers.php';

class registration extends Controller{

    public function register(){

        $this->model = $this->model('registration_mdl');
        $data = json_decode(file_get_contents("php://input"));

        $this->model->fname = $data->fname;
        $this->model->lname = $data->lname;
        $this->model->bdate = $data->bdate;
        
        $base_string = $data->fname . "azertyuiopqsdfghjklmwxcvbn1234567890";
        $this->model->uuid = substr(str_shuffle($base_string), 0, 8);

        $this->model->register();
        
        //!maybe conflicts in naming
        $data = [];
        array_push($data,$this->model->uuid);
        echo json_encode($data);
    }
}