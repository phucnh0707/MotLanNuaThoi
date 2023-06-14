import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}
  //checkout
  insertCheckout(data: any) {
    return this._http
      .post<any>('http://localhost:3000/order_details', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  //checkout
  insertOrder(data: any) {
    return this._http.post<any>('http://localhost:3000/order', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  //cart
  postCart(data: any) {
    return this._http.post<any>('http://localhost:3000/cart', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getCart() {
    return this._http.get<any>('http://localhost:3000/cart').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  //crud category here
  postCategory(data: any) {
    return this._http.post<any>('http://localhost:3000/categories', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getOrder() {
    return this._http.get<any>('http://localhost:3000/order').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getPerOrder(id: any) {
    return this._http
      .get<any>('http://localhost:3000/order?order_code=' + id)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  getCategory() {
    return this._http.get<any>('http://localhost:3000/categories').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  deleteCate(id: number) {
    return this._http
      .delete<any>('http://localhost:3000/categories/' + id)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  deleteCart(id: number) {
    return this._http.delete<any>('http://localhost:3000/cart/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  updateCategory(data: any, id: number) {
    return this._http
      .put<any>('http://localhost:3000/categories/' + id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  updateCart(data: any, id: number) {
    return this._http.put<any>('http://localhost:3000/cart/' + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  //crud product here
  postProduct(data: any) {
    return this._http.post<any>('http://localhost:3000/products', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getProduct() {
    return this._http.get<any>('http://localhost:3000/products').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  updateProduct(data: any, id: number) {
    return this._http
      .put<any>('http://localhost:3000/products/' + id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  updateOrder(data: any, id: any) {
    return this._http.put<any>('http://localhost:3000/order/' + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  deleteProduct(id: number) {
    return this._http.delete<any>('http://localhost:3000/products/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  deleteOrder(id: number) {
    return this._http.delete<any>('http://localhost:3000/order/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getPerProduct(id: number) {
    return this._http.get<any>('http://localhost:3000/products/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getProductByCate(id: any) {
    return this._http
      .get<any>('http://localhost:3000/products/?category_id=' + id)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  getOrderDetails(id: number) {
    return this._http
      .get<any>('http://localhost:3000/order_details/?order_code=' + id)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
