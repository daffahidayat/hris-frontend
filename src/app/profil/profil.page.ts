import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, 
  IonButtons, IonBackButton, IonCard, IonCardHeader, 
  IonCardTitle, IonCardContent, IonItem, IonLabel, 
  IonInput, IonButton, IonIcon, IonBadge, IonAvatar
} from '@ionic/angular/standalone';
import { AbsenService } from '../services/absen';

// --- DAFTARIN ICON BARU DI SINI ---
import { addIcons } from 'ionicons';
import { 
  businessOutline, personOutline, briefcaseOutline, 
  locationOutline, calendarOutline, hourglassOutline,
  lockClosedOutline, logOutOutline, menuOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, 
    IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonBadge, IonAvatar
  ]
})
export class ProfilPage implements OnInit {

  profil: any = {};
  passLama: string = '';
  passBaru: string = '';
  isLoading: boolean = false;

  constructor(
    private absenService: AbsenService,
    private router: Router
  ) { 
    // --- ICON DIMASUKIN KE DALAM ADDICONS ---
    addIcons({ 
      businessOutline, personOutline, briefcaseOutline, 
      locationOutline, calendarOutline, hourglassOutline,
      lockClosedOutline, logOutOutline, menuOutline 
    });
  }

  ngOnInit() {
    this.muatProfil();
  }

  muatProfil() {
    this.absenService.getProfil().subscribe({
      next: (res: any) => {
        this.profil = res.data;
      },
      error: (err) => {
        console.error('Gagal ambil data profil', err);
      }
    });
  }

  prosesGantiPassword() {
    if (!this.passLama || !this.passBaru) {
      alert('Isi dulu password lama dan barunya bro!');
      return;
    }

    if (this.passBaru.length < 6) {
      alert('Password baru minimal 6 karakter ya.');
      return;
    }

    this.isLoading = true;
    this.absenService.gantiPassword({
      password_lama: this.passLama,
      password_baru: this.passBaru
    }).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        alert(res.message);
        this.passLama = '';
        this.passBaru = '';
      },
      error: (err: any) => {
        this.isLoading = false;
        if (err.error && err.error.message) {
          alert(err.error.message);
        } else {
          alert('Gagal ganti password. Cek koneksi.');
        }
      }
    });
  }

  // --- FUNGSI BUAT BALIK KE HOME ---
  kembaliKeHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    localStorage.removeItem('token_absen');
    this.router.navigate(['/login']);
  }
}