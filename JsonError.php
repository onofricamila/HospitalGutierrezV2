<?php
class JsonError
{
    public $error;
    public $description;

    public function __construct($error, $desc)
    {
        $this->error = $error;
        $this->description = $desc;
    }
}
