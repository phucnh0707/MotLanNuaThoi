import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CartData } from '../cart/cart.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-productbycate',
  templateUrl: './productbycate.component.html',
  styleUrls: ['./productbycate.component.css'],
})
export class ProductbycateComponent implements OnInit {
  ProductByCate: any;
  CartModelObj: CartData = new CartData();
  id: any;

  constructor(
    private api: ApiService,
    private activateRoute: ActivatedRoute,
    private _http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.getProByCate(this.id);
    });
  }
  //get data
  getProByCate(id: any) {
    this.api.getProductByCate(this.id).subscribe((res) => {
      this.ProductByCate = res;
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
