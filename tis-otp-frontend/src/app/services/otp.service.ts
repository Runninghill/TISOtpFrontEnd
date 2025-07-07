import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private apiUrl = 'https://localhost:53535/api/Otp'; // Replace with Azure URL after deployment

  constructor(private http: HttpClient) {}

  requestOtp(email: string) {
    return this.http.post(`${this.apiUrl}/request`, { email }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  verifyOtp(email: string, otpCode: string) {
    return this.http.post(`${this.apiUrl}/verify`, { email, otpCode });
  }
}
