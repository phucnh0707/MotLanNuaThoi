import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CartData } from '../cart/cart.model';
import { CheckoutData } from '../checkout/checkout.model';
import { OrderData } from '../checkout/order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  allCartData: any;
  totalamount: any;
  CartModelObj: CartData = new CartData();
  CheckoutModelObj: CheckoutData = new CheckoutData();
  OrderModelObj: OrderData = new OrderData();
  formValue!: FormGroup;
  showLogin!: boolean;
  showCheckout!: boolean;
  checkout!: boolean;
  constructor(
    private api: ApiService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.toggleCheckout();
    this.allCart();
    this.getTotal();
  }
  toggleCheckout() {
    if (localStorage.getItem('login-customer')) {
      this.showCheckout = true;
      this.showLogin = false;
    } else {
      this.showCheckout = false;
      this.showLogin = true;
    }
  }
  //delete data
  deleteCart(data: any) {
    this.api.deleteCart(data.id).subscribe((res) => {
      alert('Delete Cart Successful');

      this.allCart();
    });
  }

  tangCart(data: any) {
    this.CartModelObj.quantity = data.quantity + 1;
    this.CartModelObj.title = data.title;
    this.CartModelObj.image = data.image;
    this.CartModelObj.price = data.price;
    this.CartModelObj.cart_id = data.id;
    this.CartModelObj.category_id = data.category_id;
    this.api.updateCart(this.CartModelObj, data.id).subscribe((res) => {
      // alert('Cart Updated Successfull');
      this.allCart();
    });
  }

  giamCart(data: any) {
    if (data.quantity > 1) {
      this.CartModelObj.quantity = data.quantity - 1;
      this.CartModelObj.title = data.title;
      this.CartModelObj.image = data.image;
      this.CartModelObj.price = data.price;
      this.CartModelObj.cart_id = data.id;
      this.CartModelObj.category_id = data.category_id;
      this.api.updateCart(this.CartModelObj, data.id).subscribe((res) => {
        // alert('Cart Updated Successfull');
        this.allCart();
      });
    }
  }
  getTotal() {
    let total = 0;
    for (var i = 0; i < this.allCartData.length; i++) {
      if (this.allCartData[i].price) {
        total += this.allCartData[i].price * this.allCartData[i].quantity;
        this.totalamount = total;
      }
    }
    return total;
  }
  //get data
  allCart() {
    this.api.getCart().subscribe((res) => {
      this.allCartData = res;
    });
  }
  EmptyCart() {
    for (var i = 0; i < this.allCartData.length; i++) {
      this.api.deleteCart(this.allCartData[i].id).subscribe((res) => {});
    }
    this.router.navigate(['homepage']);
  }
  Checkout() {
    let order_code = (Math.random() + 1).toString(36).substring(7);
    this.OrderModelObj.order_code = order_code;
    this.OrderModelObj.status = 'Đơn hàng mới';
    this.api.insertOrder(this.OrderModelObj).subscribe(
      (res) => {},
      (err) => {}
    );
    for (var i = 0; i < this.allCartData.length; i++) {
      this.CheckoutModelObj.title = this.allCartData[i].title;
      this.CheckoutModelObj.price = this.allCartData[i].price;
      this.CheckoutModelObj.image = this.allCartData[i].image;
      this.CheckoutModelObj.quantity = this.allCartData[i].quantity;
      this.CheckoutModelObj.order_code = order_code;
      this.api.insertCheckout(this.CheckoutModelObj).subscribe(
        (res) => {},
        (err) => {}
      );
      this.api.deleteCart(this.allCartData[i].id).subscribe((res) => {});
    }
    this.router.navigate(['thanks']);
  }
}
