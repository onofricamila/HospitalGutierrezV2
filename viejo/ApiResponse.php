<?php
class ApiResponse
{
    public $error;
    public $content;

    public function __construct($error, $content)
    {
        $this->error = $error;
        $this->content = $content;
    }
}
