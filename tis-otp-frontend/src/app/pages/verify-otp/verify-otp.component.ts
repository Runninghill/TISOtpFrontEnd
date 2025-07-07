import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OtpService } from '../../services/otp.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent {
  otpCode = '';
  email = '';
  isResending = false;
  resentOtp: string | null = null;
  constructor(private otpService: OtpService, private router: Router, private snackBar: MatSnackBar) {
    const nav = this.router.getCurrentNavigation();
    this.email = nav?.extras.state?.['email'] ?? '';
  }
  submit() {
    this.otpService.verifyOtp(this.email, this.otpCode).subscribe({
      next: (res: any) => {
        let msg = 'OTP verified successfully!';
        if (typeof res === 'string') msg = res;
        else if (res && typeof res.message === 'string') msg = res.message;
        this.resentOtp = null;
        this.otpCode = '';
        this.router.navigate(['/otp-success']);
      },
      error: err => {
        let errMsg = 'OTP verification failed.';
        if (typeof err?.error === 'string') errMsg = err.error;
        else if (err?.error && typeof err.error.message === 'string') errMsg = err.error.message;
        else if (typeof err === 'string') errMsg = err;
        else if (err && typeof err.message === 'string') errMsg = err.message;
        this.snackBar.open(errMsg, 'Close', { duration: 4000, panelClass: 'otp-snackbar-error' });
      }
    });
  }
  resendOtp() {
    if (this.isResending) return;
    this.isResending = true;
    this.otpService.requestOtp(this.email).subscribe({
      next: (res: any) => {
        if (res.otp) {
          this.resentOtp = res.otp;
          this.snackBar.open(`Your OTP: ${res.otp}`, 'Close', { duration: 6000, panelClass: 'otp-snackbar' });
        } else {
          this.resentOtp = null;
          this.snackBar.open('OTP resent. Please check your email.', 'Close', { duration: 4000, panelClass: 'otp-snackbar' });
        }
        this.isResending = false;
      },
      error: err => {
        const apiMsg = err?.error || 'Failed to resend OTP.';
        this.snackBar.open(apiMsg, 'Close', { duration: 4000, panelClass: 'otp-snackbar-error' });
        this.isResending = false;
      }
    });
  }
}