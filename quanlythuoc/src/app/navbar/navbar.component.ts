import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  showSignin!: boolean;
  showLogout!: boolean;
  login_name: any;
  allCartData: any;
  allCategoryData: any;
  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.toggleLogin();
    this.allCategory();
  }
  toggleLogin() {
    if (localStorage.getItem('login-customer')) {
      this.showSignin = false;
      this.showLogout = true;
    } else {
      this.showSignin = true;
      this.showLogout = false;
    }
  }
  getLoginName() {
    if (localStorage.getItem('login-name')) {
      return (this.login_name = localStorage.getItem('login-name'));
    } else {
      return (this.login_name = '');
    }
  }
  logOut_Customer() {
    localStorage.removeItem('login-customer');
    localStorage.removeItem('login-name');
    this.router.navigate(['signin']);
  }
  //get data
  allCart() {
    this.api.getCart().subscribe((res) => {
      this.allCartData = res;
    });
  }
  //get all category
  allCategory() {
    this.api.getCategory().subscribe((res) => {
      this.allCategoryData = res;
    });
  }
}
