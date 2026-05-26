import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonItem, IonLabel, IonInput, IonButton, IonIcon, IonSelect, IonSelectOption,
  LoadingController
} from '@ionic/angular/standalone';
import { AbsenService } from '../services/absen';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { cameraOutline, personAddOutline, saveOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tambah-karyawan',
  templateUrl: './tambah-karyawan.page.html',
  styleUrls: ['./tambah-karyawan.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonItem, IonLabel, IonInput, IonButton, IonIcon, IonSelect, IonSelectOption,
    CommonModule, FormsModule
  ]
})
export class TambahKaryawanPage {

  // Model data form karyawan baru
  karyawan: any = {
    name: '',
    email: '',
    password: '',
    department: '',
    position: '',
    status_karyawan: '', // Default status
    homebased: '',
    birth_date: '',
    join_date: '',
    foto_profil: '' // Menyimpan string base64 foto
  };

  previewFoto: string = '';

  constructor(
    private absenService: AbsenService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {
    addIcons({ cameraOutline, personAddOutline, saveOutline });
  }

  // Fungsi jepret pas foto karyawan
  async ambilFoto() {
    try {
      const foto = await Camera.getPhoto({
        quality: 70,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt // Bisa milih mau kamera langsung atau galeri laptop/HP
      });

      if (foto.base64String) {
        this.karyawan.foto_profil = foto.base64String;
        this.previewFoto = 'data:image/png;base64,' + foto.base64String;
      }
    } catch (e) {
      console.log('Batal ambil foto:', e);
    }
  }

  // Fungsi submit data ke Laravel
  async simpanKaryawan() {
    // Validasi sederhana di frontend
    if (!this.karyawan.name || !this.karyawan.email || !this.karyawan.password || !this.karyawan.department) {
      alert('Tolong lengkapi nama, email, password, dan departemen karyawan baru bro!');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Sedang mendaftarkan karyawan...',
      spinner: 'crescent'
    });
    await loading.present();

    this.absenService.tambahKaryawan(this.karyawan).subscribe({
      next: (res: any) => {
        loading.dismiss();
        alert(res.message);
        // Reset form jika sukses
        this.router.navigate(['/home']);
      },
      error: (err) => {
        loading.dismiss();
        alert(err.error?.message || 'Gagal menyimpan data karyawan baru. Cek apakah email sudah terdaftar.');
      }
    });
  }
}