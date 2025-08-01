import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private apiUrl = environment.apiUrl;

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
