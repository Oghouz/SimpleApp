<?php
namespace App\Controllers;

use App\Models\MenuModel;
use Core\Base\Controller;

class MenuController extends Controller
{
    public function index()
    {
        $menus = MenuModel::all();
        $this->assign('menus', $menus);
        $this->render();
    }
}