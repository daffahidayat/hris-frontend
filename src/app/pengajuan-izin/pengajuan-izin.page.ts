import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, 
  IonSelect, IonSelectOption, IonInput, IonTextarea, IonButton,
  IonButtons, IonBackButton, IonIcon, IonList, LoadingController
} from '@ionic/angular/standalone';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AbsenService } from '../services/absen';

import { addIcons } from 'ionicons';
import { cameraOutline, sendOutline } from 'ionicons/icons';

@Component({
  selector: 'app-pengajuan-izin',
  templateUrl: './pengajuan-izin.page.html',
  styleUrls: ['./pengajuan-izin.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, 
    IonSelect, IonSelectOption, IonInput, IonTextarea, IonButton,
    IonButtons, IonBackButton, IonIcon, IonList,
    CommonModule, FormsModule
  ]
})
export class PengajuanIzinPage {
  tipe_izin = '';
  tanggal = '';
  alasan = '';
  buktiBase64 = '';

  constructor(
    private absenService: AbsenService, 
    private router: Router,
    private loadingCtrl: LoadingController
  ) {
    addIcons({ cameraOutline, sendOutline });
  }

  async ambilFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 70,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt // Pake Prompt biar bisa milih dari Galeri atau Kamera langsung
      });
      this.buktiBase64 = image.base64String || '';
    } catch (e) {
      console.log('Batal ambil foto');
    }
  }

  async simpan() {
    if (!this.tipe_izin || !this.tanggal || !this.alasan) {
      alert('Tipe, Tanggal, dan Alasan wajib diisi bro!');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Mengirim pengajuan...',
      spinner: 'crescent'
    });
    await loading.present();

    const data = {
      tipe_izin: this.tipe_izin,
      tanggal: this.tanggal, 
      alasan: this.alasan,
      bukti: this.buktiBase64
    };

    this.absenService.kirimIzin(data).subscribe({
      next: (res: any) => {
        loading.dismiss();
        alert('Mantap! Pengajuan izin berhasil dikirim.');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        loading.dismiss();
        console.error('Error kirim izin:', err);
        alert('Gagal kirim izin, cek koneksi lu bro.');
      }
    });
  }
}