<?php
namespace App\Models;

use Core\Base\Model;

class MenuModel extends Model
{
    protected $table = 'menus';

    public static function all()
    {
        $menus = [];
        for ($i = 1; $i < 11; $i++) {
            $menus[] = [
                'id' => $i,
                'title' => 'Burger ' . $i,
                'image' => 'https://picsum.photos/200/200',
                'description' => 'burger ' . $i . ' description.',
                'price' => rand(1, 20)
            ];
        }

        return $menus;
    }

}