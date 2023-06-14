import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CartData } from '../cart/cart.model';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  allProductData: any;
  checkCart: any;
  allCartData: any;
  formValue!: FormGroup;
  CartModelObj: CartData = new CartData();

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private _http: HttpClient
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      title: [''],
      image: [''],
      price: [''],
      category_id: [''],
      quantity: [''],
      cart_id: [''],
    });
    this.allProduct();
    this.allCartData();
  }

  //get data
  allProduct() {
    this.api.getProduct().subscribe((res) => {
      this.allProductData = res;
    });
  }
  AddToCart(data: any) {
    this._http.get<any>('http://localhost:3000/cart').subscribe(
      (res) => {
        const checkcart = res.find((a: any) => {
          return a.cart_id === data.id;
        });
        if (checkcart) {
          alert('Product Already in Cart');
        } else {
          this.CartModelObj.title = data.title;
          this.CartModelObj.image = data.image;
          this.CartModelObj.price = data.price;
          this.CartModelObj.quantity = 1;
          this.CartModelObj.cart_id = data.id;
          this.CartModelObj.category_id = data.category_id;
          this.api.postCart(this.CartModelObj).subscribe(
            (res) => {
              alert('Cart Added Successfull');

              this.router.navigate(['cart']);
            },
            (err) => {
              alert('Cart Add Failed');
            }
          );
        }
      },
      (err) => {
        alert('Db not found');
      }
    );
  }
}
