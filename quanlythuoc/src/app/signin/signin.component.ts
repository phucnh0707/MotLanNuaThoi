import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }
  logIn() {
    this._http.get<any>('http://localhost:3000/customer-signup').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
          );
        });
        if (user) {
          alert('Login Customer Successful');
          this.loginForm.reset();
          this.router.navigate(['cart']);
          localStorage.setItem('login-customer', 'true');
          localStorage.setItem('login-name', user.email);
        } else {
          alert('User Customer not Found!!');
        }
      },
      (err) => {
        alert('Db not found');
      }
    );
  }
}
