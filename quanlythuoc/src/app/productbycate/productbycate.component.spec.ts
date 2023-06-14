import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductbycateComponent } from './productbycate.component';

describe('ProductbycateComponent', () => {
  let component: ProductbycateComponent;
  let fixture: ComponentFixture<ProductbycateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductbycateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductbycateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
