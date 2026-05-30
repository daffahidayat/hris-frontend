import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButton, IonButtons, IonGrid, IonRow, IonCol,
  IonList, IonItem, IonLabel, IonNote, IonListHeader,
  LoadingController,
  IonAvatar,
  IonCard, IonCardContent, IonIcon,
  IonBadge,
  IonRefresher, IonRefresherContent 
} from '@ionic/angular/standalone';
import { AbsenService } from '../services/absen'; 
import { CommonModule } from '@angular/common';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

import { addIcons } from 'ionicons';
// --- walletOutline UDAH DITAMBAHIN DI SINI BRO ---
import { ribbonOutline, documentTextOutline, documentText, personCircleOutline, chevronDownCircleOutline, timeOutline, walletOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonButton, IonButtons, IonGrid, IonRow, IonCol,
    IonList, IonItem, IonLabel, IonNote, IonListHeader,
    IonAvatar,
    IonCard, IonCardContent, IonIcon, IonBadge, 
    IonRefresher, IonRefresherContent,
    CommonModule
  ],
})
export class HomePage {

  listAbsen: any[] = [];
  totalHadir: number = 0;
  sisaCuti: number = 12;
  statusKlaster: string = 'Memuat...'; 
  listIzin: any[] = [];

  jamKerja: any = {
    target: 160,
    aktual: 0,
    sisa: 160,
    persentase: 0
  };

  targetLat = -6.327822; 
  targetLng = 107.311627;
  maxJarakMeter = 100;
  
  constructor(
    private router: Router,
    private absenService: AbsenService,
    private loadingCtrl: LoadingController 
  ) {
    // --- walletOutline UDAH DIDAFTARIN DI SINI ---
    addIcons({ ribbonOutline, documentTextOutline, documentText, personCircleOutline, chevronDownCircleOutline, timeOutline, walletOutline });

    this.muatSemuaData();
  }

  muatSemuaData() {
    this.muatRiwayat();
    this.muatKlaster(); 
    this.muatRiwayatIzin(); 
    this.muatStatKaryawan(); 
  }

  handleRefresh(event: any) {
    this.muatSemuaData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  muatRiwayat() {
    this.absenService.getRiwayat().subscribe({
      next: (res: any) => { this.listAbsen = res.data; },
      error: (err: any) => { console.error('Gagal ambil riwayat', err); }
    });
  }

  muatKlaster() {
    this.absenService.getKlaster().subscribe({
      next: (res: any) => {
        if (res.data && res.data.length > 0) {
          this.statusKlaster = res.data[0].status;
        } else {
          this.statusKlaster = 'Belum Ada Data';
        }
      },
      error: (err: any) => {
        console.error('Gagal ambil data klaster', err);
        this.statusKlaster = 'Gagal Analisis';
      }
    });
  }

  muatRiwayatIzin() {
    this.absenService.getRiwayatIzinKu().subscribe({
      next: (res: any) => { this.listIzin = res.data; },
      error: (err: any) => { console.error('Gagal ambil riwayat izin', err); }
    });
  }

  muatStatKaryawan() {
    this.absenService.getStatKaryawan().subscribe({
      next: (res: any) => {
        this.totalHadir = res.hadir;
        this.sisaCuti = res.sisa_cuti;
        
        if (res.jam_kerja) {
          this.jamKerja = res.jam_kerja;
        }
      },
      error: (err: any) => {
        console.error('Gagal ambil statistik karyawan', err);
      }
    });
  }

  hitungJarak(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371e3; 
    const p1 = lat1 * Math.PI / 180;
    const p2 = lat2 * Math.PI / 180;
    const dp = (lat2 - lat1) * Math.PI / 180;
    const dl = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dp / 2) * Math.sin(dp / 2) +
              Math.cos(p1) * Math.cos(p2) *
              Math.sin(dl / 2) * Math.sin(dl / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; 
  }

  async absen(tipe: string) {
    try {
      const koordinat = await Geolocation.getCurrentPosition();
      const lat = koordinat.coords.latitude;
      const lng = koordinat.coords.longitude;

      const jarak = this.hitungJarak(lat, lng, this.targetLat, this.targetLng);
      
      if (jarak > this.maxJarakMeter) {
        alert(`Waduh bro! Lu kejauhan. Jarak lu ${Math.round(jarak)} meter dari lokasi. Minimal harus 100 meter ya!`);
        return;
      }

      const foto = await Camera.getPhoto({
        quality: 70,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera 
      });

      if (!foto.base64String) return;

      const loading = await this.loadingCtrl.create({
        message: `Lagi proses absen ${tipe}...`,
        spinner: 'crescent'
      });
      await loading.present();

      this.absenService.catatAbsen(tipe, foto.base64String, lat, lng).subscribe({
        next: (res: any) => {
          loading.dismiss();
          alert(`Mantap! Berhasil Absen ${tipe}.`);
          this.muatSemuaData(); 
        },
        error: (err: any) => {
          loading.dismiss();
          if (err.error && err.error.message) {
            alert(err.error.message); 
          } else {
            alert('Gagal kirim data ke server. Cek koneksi atau terminal Laravel.');
          }
        }
      });
    } catch (e) {
      console.error('Proses absen dibatalkan atau error:', e);
    }
  }

  logout() {
    localStorage.removeItem('token_absen');
    this.router.navigate(['/login']);
  }

  keHalamanIzin() {
    this.router.navigate(['/pengajuan-izin']);
  }

  keHalamanProfil() {
    this.router.navigate(['/profil']);
  }

  keLembur() {
    this.router.navigate(['/lembur']);
  }

  // --- INI FUNGSI BUAT PINDAH KE HALAMAN SLIP GAJI BRO ---
  keSlipGaji() {
    this.router.navigate(['/slip-gaji']);
  }
}