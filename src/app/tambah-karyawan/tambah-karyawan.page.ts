import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonItem, IonLabel, IonInput, IonButton, IonIcon, IonSelect, IonSelectOption,
  IonDatetimeButton, IonModal, IonDatetime 
} from '@ionic/angular/standalone';
import { AbsenService } from '../services/absen';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addIcons } from 'ionicons';
// --- TAMBAHIN calendarOutline DI SINI ---
import { cameraOutline, personAddOutline, saveOutline, calendarOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tambah-karyawan',
  templateUrl: './tambah-karyawan.page.html',
  styleUrls: ['./tambah-karyawan.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonItem, IonLabel, IonInput, IonButton, IonIcon, IonSelect, IonSelectOption,
    IonDatetimeButton, IonModal, IonDatetime, 
    CommonModule, FormsModule
  ]
})
export class TambahKaryawanPage {

  karyawan: any = {
    name: '',
    email: '',
    password: '',
    department: '',
    position: '',
    status_karyawan: 'Outsourcing',
    homebased: '',
    birth_date: '',
    join_date: '',
    foto_profil: '' 
  };

  previewFoto: string = '';

  constructor(
    private absenService: AbsenService,
    private router: Router
  ) {
    // --- DAFTARIN calendarOutline DI SINI ---
    addIcons({ cameraOutline, personAddOutline, saveOutline, calendarOutline });
  }

  async ambilFoto() {
    try {
      const foto = await Camera.getPhoto({
        quality: 70,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt 
      });

      if (foto.base64String) {
        this.karyawan.foto_profil = foto.base64String;
        this.previewFoto = 'data:image/png;base64,' + foto.base64String;
      }
    } catch (e) {
      console.log('Batal ambil foto:', e);
    }
  }

  async simpanKaryawan() {
    if (!this.karyawan.name || !this.karyawan.email || !this.karyawan.password || !this.karyawan.department) {
      alert('Tolong lengkapi nama, email, password, dan departemen karyawan baru bro!');
      return;
    }

    this.absenService.tambahKaryawan(this.karyawan).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.router.navigate(['/manajemen-dashboard']);
      },
      error: (err) => {
        alert(err.error?.message || 'Gagal menyimpan data karyawan baru. Cek apakah email sudah terdaftar.');
      }
    });
  }
}