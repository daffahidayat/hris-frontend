import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Buat pindah halaman abis login
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, 
  IonList, IonItem, IonInput, IonButton 
} from '@ionic/angular/standalone';

// Panggil kurir yang tadi kita bikin (sesuaikan nama file belakangnya kalau error, bisa /auth atau /auth.service)
import { AuthService } from '../../services/auth'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, 
    CommonModule, FormsModule, IonList, IonItem, IonInput, IonButton
  ]
})
export class LoginPage implements OnInit {
  // Bikin tempat penampungan data
  emailData = '';
  passwordData = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {}

  // Fungsi yang jalan pas tombol diklik
  gasLogin() {
    if (!this.emailData || !this.passwordData) {
      alert('Woy, Email sama Password isi dulu bro!');
      return;
    }

    const dataKirim = {
      email: this.emailData,
      password: this.passwordData
    };

    console.log('Lagi ngirim data ke Laravel...', dataKirim);

    this.authService.login(dataKirim).subscribe({
      next: (responAPI: any) => {
        console.log('Sukses Bro!', responAPI);
        // Simpen Token (Kunci) dari Laravel ke memori HP
        localStorage.setItem('token_absen', responAPI.access_token);
        
        alert('Login Sukses! Selamat Datang.');
        
        // --- TAMBAHAN CEK ROLE DI SINI BRO ---
        if (responAPI.role === 'admin') {
          console.log('atmin login loh ya!');
          this.router.navigate(['/admin-dashboard']);
        } else {
          console.log('Karyawan login.');
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.error('Waduh gagal:', err);
        alert('Login Gagal Bro! Cek lagi email/password lu.');
      }
    });
  }
}