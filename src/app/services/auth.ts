import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Ini alamat API Laravel lu (pastiin port-nya 8000 kalau lu pake php artisan serve)
  apiUrl = 'http://localhost:8000/api'; 

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(this.apiUrl + '/login', data);
  }
}