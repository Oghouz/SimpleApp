import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  carts: Array<{id:number, title: string, quantity:number, price:number}>;
  total: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

    this.total = 0;
    this.storage.get('carts').then((data) => {
      this.carts = data ? JSON.parse(data) : [];
      for (var i=0; i<this.carts.length; i++) {
        console.log(this.carts[i].price * this.carts[i].quantity);

        this.total += this.carts[i].price * this.carts[i].quantity;
      }
    });
  }


  removeFromCart(index) {
    console.log(index);
    this.carts.splice(index, 1);
    this.storage.set('carts', JSON.stringify(this.carts));
  }

  emptyCart() {
    this.storage.set('carts', null);
  }

}
