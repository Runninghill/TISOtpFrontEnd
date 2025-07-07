import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { VerifyOtpComponent } from './pages/verify-otp/verify-otp.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { OtpSuccessComponent } from './pages/otp-success/otp-success.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verify', component: VerifyOtpComponent },
  { path: 'otp-success', component: OtpSuccessComponent }
];
