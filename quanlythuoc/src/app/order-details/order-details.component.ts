import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { ActivatedRoute } from '@angular/router';
import { OrderData } from '../checkout/order.model';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}
  OrderModelObj: OrderData = new OrderData();
  DataOrderDetails: any;
  OrderId: any;
  id: any;
  order_id: any;
  totalamount: any;
  ShowStatus!: boolean;
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params) => {
      this.id = params.get('code');
      this.order_id = params.get('id');
    });
    this.checkLogin();
    this.getOrderDetails(this.id);
    this.getTotal();
    this.Confirm_Order();
  }
  getPerOrder(id: any) {
    this.api.getPerOrder(id).subscribe((res) => {
      this.OrderId = res.id;
    });
  }
  Confirm_Order() {
    this.OrderModelObj.order_code = this.id;
    this.OrderModelObj.status = 'Đã xử lý';

    this.api.updateOrder(this.OrderModelObj, this.order_id).subscribe((res) => {
      alert('Order Updated Successfull');
      this.router.navigate(['order']);
    });
  }
  getTotal() {
    let total = 0;
    for (var i = 0; i < this.DataOrderDetails.length; i++) {
      if (this.DataOrderDetails[i].price) {
        total +=
          this.DataOrderDetails[i].price * this.DataOrderDetails[i].quantity;
        this.totalamount = total;
      }
    }
    return total;
  }
  checkLogin() {
    var checkLogin = localStorage.getItem('login');
    if (!checkLogin) {
      this.router.navigate(['login']);
    }
  }

  getOrderDetails(id: any) {
    this.api.getOrderDetails(id).subscribe((res) => {
      this.DataOrderDetails = res;
    });
  }
}
