import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AbsenService {
  apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  base64ToBlob(base64: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Blob([new Uint8Array(byteNumbers)], { type: 'image/jpeg' });
  }

  catatAbsen(tipeAbsen: string, fotoBase64: string, lat: number, lng: number) {
    const token = localStorage.getItem('token_absen');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });

    const formData = new FormData();
    formData.append('status', tipeAbsen); 
    formData.append('latitude', lat.toString()); 
    formData.append('longitude', lng.toString());
    
    const fotoFile = this.base64ToBlob(fotoBase64);
    formData.append('foto_selfie', fotoFile, 'selfie_asli.jpg');

    return this.http.post(this.apiUrl + '/absen', formData, { headers: headers });
  }

  getRiwayat() {
    const token = localStorage.getItem('token_absen');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Pake metode GET karena kita cuma mau ambil data
    return this.http.get(this.apiUrl + '/absen', { headers: headers });
  }

  // Fungsi buat narik data analisis K-Means
  getKlaster() {
    const token = localStorage.getItem('token_absen');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.apiUrl + '/klaster', { headers: headers });
  }

  // --- TAMBAHAN FITUR IZIN & CUTI ---

  kirimIzin(data: any) {
    const token = localStorage.getItem('token_absen');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.apiUrl + '/izin', data, { headers: headers });
  }

  getDaftarIzin() {
    const token = localStorage.getItem('token_absen');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.apiUrl + '/izin', { headers: headers });
  }

  updateStatusIzin(id: number, status: string) {
    const token = localStorage.getItem('token_absen');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.apiUrl + '/izin/' + id + '/status', { status }, { headers: headers });
  }

  // Tambahin fungsi ini di bawah fitur izin yang lain
  getRiwayatIzinKu() {
    const token = localStorage.getItem('token_absen');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.apiUrl + '/izin/riwayat', { headers: headers });
  }

  getStatKaryawan() {
    const token = localStorage.getItem('token_absen');
    return this.http.get(`${this.apiUrl}/dashboard/karyawan`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    });
  }

  getStatAdmin() {
    const token = localStorage.getItem('token_absen');
    return this.http.get(`${this.apiUrl}/dashboard/admin`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    });
  }

  getProfil() {
    const token = localStorage.getItem('token_absen');
    return this.http.get(`${this.apiUrl}/profil`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    });
  }

  gantiPassword(data: any) {
    const token = localStorage.getItem('token_absen');
    return this.http.post(`${this.apiUrl}/profil/ganti-password`, data, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    });
  }

  tambahKaryawan(data: any) {
    const token = localStorage.getItem('token_absen');
    return this.http.post(`${this.apiUrl}/admin/tambah-karyawan`, data, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    });
  }
}