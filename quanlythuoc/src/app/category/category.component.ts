import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { CategoryData } from './category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  formValue!: FormGroup;
  categoryModelObj: CategoryData = new CategoryData();
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}
  allCategoryData: any;
  showAdd!: boolean;
  showbtn!: boolean;
  checkLogin() {
    var checkLogin = localStorage.getItem('login');
    if (!checkLogin) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      title: [''],
      note: [''],
      image: [''],
    });
    this.allCategory();
    this.checkLogin();
  }

  clickAddCategory() {
    this.formValue.reset();
    this.showAdd = true;
    this.showbtn = false;
  }

  //delete data
  deleteCate(data: any) {
    this.api.deleteCate(data.id).subscribe((res) => {
      alert('Delete Category Successful');
      this.allCategory();
    });
  }
  addCategory() {
    this.categoryModelObj.title = this.formValue.value.title;
    this.categoryModelObj.note = this.formValue.value.note;
    this.categoryModelObj.image = this.formValue.value.image;
    this.api.postCategory(this.categoryModelObj).subscribe(
      (res) => {
        alert('Category Added Successfull');

        this.formValue.reset();
        this.allCategory();
      },
      (err) => {
        alert('Category Add Failed');
      }
    );
  }
  allCategory() {
    this.api.getCategory().subscribe((res) => {
      this.allCategoryData = res;
    });
  }

  //on edit
  editCate(data: any) {
    this.showAdd = false;
    this.showbtn = true;
    this.categoryModelObj.id = data.id;
    this.formValue.controls['title'].setValue(data.title);
    this.formValue.controls['note'].setValue(data.note);
    this.formValue.controls['image'].setValue(data.image);
  }
  updateCategory() {
    this.categoryModelObj.title = this.formValue.value.title;
    this.categoryModelObj.note = this.formValue.value.note;
    this.categoryModelObj.image = this.formValue.value.image;
    this.api
      .updateCategory(this.categoryModelObj, this.categoryModelObj.id)
      .subscribe((res) => {
        alert('Category Updated Successfull');
        this.allCategory();
      });
  }
  logOut() {
    localStorage.removeItem('login');
    this.router.navigate(['login']);
  }
}
