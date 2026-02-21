import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {CartDetailsComponent} from "./components/cart-details/cart-details.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import { LoginStatusComponent } from './components/login-status/login-status.component';
import {MembersPageComponent} from "./components/members-page/members-page.component";
import {OrderHistoryComponent} from "./components/order-history/order-history.component";

export const routes: Routes = [
  {path: 'members', component: MembersPageComponent, canActivate: [AuthGuard]},
  {path: 'order-history', component: OrderHistoryComponent, canActivate: [AuthGuard]},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login', component: LoginStatusComponent },
  { path: 'login/callback', component: LoginStatusComponent },
  { path: '**', redirectTo: '/products', pathMatch: 'full' }
];
