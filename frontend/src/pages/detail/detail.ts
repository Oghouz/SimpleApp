import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  menu: {
    id: number,
    title: string,
    description: string,
    price: number
  };
  quantity:number;
  quantityLimit: {min:number, max:number};
  carts: Array<{id:number, title: string, quantity:number, price:number}>;
  countCart: any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private storage: Storage,
      public toastCtrl: ToastController,
  ) {

    this.quantity = 1;
    this.quantityLimit = {min:1, max:99};
    this.menu = this.navParams.get('menu');
  }

  addQty() {
    if (this.quantity < this.quantityLimit.max)
    this.quantity++;
  }

  removeQty() {
    if (this.quantity > this.quantityLimit.min) {
      this.quantity--;
    }
  }

  addToCart(event, menu) {

    let inCart = false;
    for (let i=0; i<this.carts.length; i++) {
      if (this.carts[i].id == menu.id) {
        this.carts[i].quantity++;
        inCart = true;
      }
    }
    if (!inCart) {
      this.carts.push(menu);
    }

    this.countCart = this.carts.length;
    this.storage.set('carts', JSON.stringify(this.carts));

    let toast = this.toastCtrl.create({
      message: 'Menu été ajouté dans votre panier',
      duration: 3000
    });

    toast.present();
  }

}