import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-otp-success',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './otp-success.component.html',
  styleUrls: ['./otp-success.component.scss']
})
export class OtpSuccessComponent {
  constructor(private router: Router) {}
  restart() {
    this.router.navigate(['/login']);
  }
}
