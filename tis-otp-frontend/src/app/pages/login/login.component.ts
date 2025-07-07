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
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  constructor(private otpService: OtpService, private router: Router, private snackBar: MatSnackBar) {}
  submit() {
    this.otpService.requestOtp(this.email).subscribe({
      next: (res: any) => {
        this.snackBar.open(`Your OTP: ${res.otp}`, 'Close', { duration: 6000, panelClass: 'otp-snackbar' });
        setTimeout(() => this.router.navigate(['/verify'], { state: { email: this.email } }), 500);
      },
      error: err => this.snackBar.open(err.error, 'Close', { duration: 4000, panelClass: 'otp-snackbar-error' })
    });
  }
}