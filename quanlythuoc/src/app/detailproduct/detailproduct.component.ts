import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrls: ['./detailproduct.component.css'],
})
export class DetailproductComponent implements OnInit {
  perProduct: any;
  id: any;
  constructor(private api: ApiService, private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.getPerProduct(this.id);
    });
  }
  //get data
  getPerProduct(id: any) {
    this.api.getPerProduct(id).subscribe((res) => {
      this.perProduct = res;
    });
  }
}
