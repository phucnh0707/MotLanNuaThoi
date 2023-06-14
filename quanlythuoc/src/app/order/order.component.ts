import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  constructor(private api: ApiService, private router: Router) {}
  allOrderData: any;
  ngOnInit(): void {
    this.allOrder();
    this.checkLogin();
  }
  checkLogin() {
    var checkLogin = localStorage.getItem('login');
    if (!checkLogin) {
      this.router.navigate(['login']);
    }
  }

  allOrder() {
    this.api.getOrder().subscribe((res) => {
      this.allOrderData = res;
    });
  }
  logOut() {
    localStorage.removeItem('login');
    this.router.navigate(['login']);
  }
  //delete data
  deleteOrder(data: any) {
    this.api.deleteOrder(data.id).subscribe((res) => {
      alert('Delete Order Successful');
      this.allOrder();
    });
  }
}
