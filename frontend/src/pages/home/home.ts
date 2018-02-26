import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { DetailPage } from "../detail/detail";
import { CartPage } from "../cart/cart";
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  menus: any;
  carts: Array<{id:number, title: string, quantity:number, price:number}>;
  countCart: any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private storage: Storage,
      public toastCtrl: ToastController,
      public loadingCtrl: LoadingController,
      private http: HttpClient,
  ) {

    // Loading start
    let loading = this.loadingCtrl.create({
      content: "Chargement en cours ..."
    });
    loading.present();

    // Get all menu
    this.http.get('http://localhost:8080/menu').subscribe((data) => {
      this.menus = data ? data : [];
    }, error => {
      console.log(error);
    });

    // Get all menu in user cart from storage
    this.storage.get('carts').then((data) => {
      this.carts = data ? JSON.parse(data) : [];
      this.countCart = data ? JSON.parse(data).length : 0;
    });

    // Loading end
    loading.dismiss();
  }

  /**
   *  Get menus
   *
   * @returns {Promise<T>}
   */
  getMenus() {
    return new Promise(resolve => {
      this.http.get('http://localhost:8080/menu').subscribe(data => {
        resolve(data);
      }, error => {
        console.log(error);
      });
    });
  }

  /**
   *  Show menu detail page
   *
   * @param event
   * @param menu
   */
  showDetail(event, menu) {
    this.navCtrl.push(DetailPage, {
      menu: menu
    })
  }

  /**
   *  Show cart page
   *
   * @param event
   */
  showCart(event) {
    this.navCtrl.push(CartPage);
  }

  /**
   *  Add menu to cart
   *
   * @param event
   * @param menu
   */
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
