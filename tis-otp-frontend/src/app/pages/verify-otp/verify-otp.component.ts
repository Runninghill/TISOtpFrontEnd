import { Component } from '@angular/core';
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
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent {
  otpCode = '';
  email = '';
  constructor(private otpService: OtpService, private router: Router, private snackBar: MatSnackBar) {
    const nav = this.router.getCurrentNavigation();
    this.email = nav?.extras.state?.['email'] ?? '';
  }
  submit() {
    this.otpService.verifyOtp(this.email, this.otpCode).subscribe({
      next: (res: any) => this.snackBar.open(res, 'Close', { duration: 6000, panelClass: 'otp-snackbar' }),
      error: err => this.snackBar.open(err.error, 'Close', { duration: 4000, panelClass: 'otp-snackbar-error' })
    });
  }
}