import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InfoComponent } from './components/info/info.component';
import { UserComponent } from './components/user/user.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { LoginComponent } from './components/login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatButtonModule} from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SpinerComponent } from './components/spiner/spiner.component';
import { IconsModule } from 'angular-bootstrap-md';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import { RestartPassComponent } from './components/restart-pass/restart-pass.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { SignupComponent } from './components/signup/signup.component';
import {MatInputModule} from '@angular/material/input';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfDialogComponent } from './components/conf-dialog/conf-dialog.component';
import { SeeMoreComponent } from './components/see-more/see-more.component';

const routes: Routes = [];

@NgModule({
  declarations: [
    WrapperComponent,
    DashboardComponent,
    InfoComponent,
    UserComponent,
    LoginComponent,
    SpinerComponent,
    RestartPassComponent,
    NewPasswordComponent,
    SignupComponent,
    ActivateAccountComponent,
    ConfDialogComponent,
    SeeMoreComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IconsModule,
    FlexLayoutModule,
    MatBadgeModule,
    MatMenuModule,
    MatSnackBarModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatDialogModule,
  ]
})
export class DashboardModule { }
