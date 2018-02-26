<?php
namespace Core\Base;

class View
{
    protected $variables = [];
    protected $controller;
    protected $action;

    function __construct($controller, $action)
    {
        $this->controller = strtolower($controller);
        $this->action = strtolower($action);
    }

    public function assign($name, $value)
    {
        $this->variables[$name] = $value;
    }

    public function render()
    {
        extract($this->variables);

        $controllerLayout = APP_PATH . 'app/views/' . $this->controller . '/' . $this->action . '.php';

        if (is_file($controllerLayout)) {
            include($controllerLayout);
        } else {
            echo 'View not found!';
        }
    }
}
