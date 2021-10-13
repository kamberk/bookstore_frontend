import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from './components/login/login.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { RestartPassComponent } from './components/restart-pass/restart-pass.component';
import { SearchComponent } from './components/search/search.component';
import { SeeMoreComponent } from './components/see-more/see-more.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserComponent } from './components/user/user.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { PurchaseTwoComponent } from './components/purchase-two/purchase-two.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
    {
        path: '',
        component: WrapperComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'info',
                component: InfoComponent
            },
            {
                path: 'user',
                component: UserComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: SignupComponent
            },
            {
                path: 'restart-password',
                component: RestartPassComponent
            },
            {
                path: 'new-pass/:token',
                component: NewPasswordComponent
            },
            {
                path: 'activate/:token',
                component: ActivateAccountComponent
            },
            {
                path: 'see-more/:id',
                component: SeeMoreComponent
            },
            {
                path: 'cart',
                component: CartComponent
            },
            {
                path: 'search',
                component: SearchComponent
            },
            {
                path: 'all-books',
                component: AllBooksComponent
            },
            {
                path: 'purchase/:total',
                component: PurchaseComponent
            },
            {
                path: 'payment-method/:way/:total',
                component: PurchaseTwoComponent
            },
            {
                path: 'thank-you',
                component: ThankyouComponent
            },
            {
                path: 'contact',
                component: ContactComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
