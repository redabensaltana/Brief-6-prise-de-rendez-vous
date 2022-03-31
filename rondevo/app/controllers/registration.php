<?php

include_once '../app/controllers/headers.php';

class registration extends Controller{

    public function register(){

        $this->model = $this->model('registration_mdl');
        $data = json_decode(file_get_contents("php://input"));

        $this->model->fname = $data->fname;
        $this->model->lname = $data->lname;
        $this->model->bdate = $data->bdate;
        
        $permitted_chars = $data->fname . "azertyuiopqsdfghjklmwxcvbn1234567890";
        $this->model->uuid = substr(str_shuffle($permitted_chars), 0, 8);

        $this->model->register();
    }
}