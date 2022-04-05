<?php

include_once '../app/controllers/headers.php';

class reservation extends Controller
{
    public function show()
    {
        $this->model = $this->model('reservation_mdl');
        $data = $this->model->show();

        if ($data != NULL) {
            echo json_encode($data);
        } else {
            http_response_code(404);
        }
    }

    public function displaydayslots(){
        $this->model = $this->model('reservation_mdl');
        $data = json_decode(file_get_contents("php://input"));

        $this->model->date = $data->date;
        $data = $this->model->displaydayslots();

        echo json_encode($data);
    }

    public function reserve()
    {
        $this->model = $this->model('reservation_mdl');
        $data = json_decode(file_get_contents("php://input"));

        $this->model->date = $data->date;
        $this->model->slot = $data->slot;
        $this->model->uuid = $data->uuid;

        $this->model->reserve();
    }

    public function update()
    {
        $this->model = $this->model('reservation_mdl');
        $data = json_decode(file_get_contents("php://input"));

        $this->model->id = $data->id;
        $this->model->date = $data->date;
        $this->model->slot = $data->slot;
        $this->model->uuid = $data->uuid;

        $this->model->update();
    }

    public function cancel()
    {
        $this->model = $this->model('reservation_mdl');
        $data = json_decode(file_get_contents("php://input"));

        $this->model->id = $data->id;

        $this->model->cancel();
    }
}
