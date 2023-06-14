import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      address: [''],
      phone: [''],
    });
  }
  signUp() {
    this._http
      .post<any>(
        'http://localhost:3000/customer-signup ',
        this.signupForm.value
      )
      .subscribe(
        (res) => {
          alert('Registration Successfully');
          this.signupForm.reset();
          this.router.navigate(['signin']);
        },
        (err) => {
          alert('Registration Failed');
        }
      );
  }
}
