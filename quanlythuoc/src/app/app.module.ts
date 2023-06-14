import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductDashComponent } from './product-dash/product-dash.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DetailproductComponent } from './detailproduct/detailproduct.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoryComponent } from './category/category.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThanksComponent } from './thanks/thanks.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ProductbycateComponent } from './productbycate/productbycate.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductDashComponent,
    LoginComponent,
    SignUpComponent,
    HomepageComponent,
    DetailproductComponent,
    NavbarComponent,
    CategoryComponent,
    NavbarAdminComponent,
    SigninComponent,
    SignupComponent,
    CartComponent,
    CheckoutComponent,
    ThanksComponent,
    OrderComponent,
    OrderDetailsComponent,
    ProductbycateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
