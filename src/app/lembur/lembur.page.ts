import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonItem, IonLabel, IonInput, IonButton, IonIcon, IonTextarea, IonBadge, IonList,
  IonModal, IonDatetime, 
  IonCard, IonCardContent // <--- INI TAMBAHANNYA BIAR BISA PAKAI KARTU ASLI IONIC
} from '@ionic/angular/standalone';
import { AbsenService } from '../services/absen';
import { addIcons } from 'ionicons';
import { timeOutline, sendOutline, checkmarkCircleOutline, closeCircleOutline, time, calendarOutline } from 'ionicons/icons';

@Component({
  selector: 'app-lembur',
  templateUrl: './lembur.page.html',
  styleUrls: ['./lembur.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonItem, IonLabel, IonInput, IonButton, IonIcon, IonTextarea, IonBadge, IonList,
    IonModal, IonDatetime, 
    IonCard, IonCardContent, // <--- DIDAFTARIN DI SINI JUGA
    CommonModule, FormsModule
  ]
})
export class LemburPage implements OnInit {
  formLembur = {
    tanggal: '',
    jam_mulai: '',
    jam_selesai: '',
    keterangan: ''
  };

  riwayat: any[] = [];
  segmenAktif: string = 'form'; 

  constructor(private absenService: AbsenService) {
    addIcons({ timeOutline, sendOutline, checkmarkCircleOutline, closeCircleOutline, time, calendarOutline });
  }

  ngOnInit() {
    this.muatRiwayat();
  }

  ubahSegmen(segmen: string) {
    this.segmenAktif = segmen;
    if (segmen === 'riwayat') this.muatRiwayat();
  }

  formatTgl(val: string) {
    if (!val) return 'Pilih Tanggal';
    return val.split('T')[0];
  }

  formatJam(val: string) {
    if (!val) return 'Pilih Jam';
    if (val.includes('T')) return val.split('T')[1].substring(0, 5);
    return val.substring(0, 5);
  }

  submitLembur() {
    if (!this.formLembur.tanggal || !this.formLembur.jam_mulai || !this.formLembur.jam_selesai || !this.formLembur.keterangan) {
      alert('Isi data lembur dengan lengkap bro!');
      return;
    }

    let tgl = this.formLembur.tanggal;
    let jMulai = this.formLembur.jam_mulai;
    let jSelesai = this.formLembur.jam_selesai;

    if (tgl.includes('T')) tgl = tgl.split('T')[0];
    if (jMulai.includes('T')) jMulai = jMulai.split('T')[1].substring(0,5);
    if (jSelesai.includes('T')) jSelesai = jSelesai.split('T')[1].substring(0,5);

    const payloadKirim = {
      tanggal: tgl,
      jam_mulai: jMulai,
      jam_selesai: jSelesai,
      keterangan: this.formLembur.keterangan
    };

    this.absenService.ajukanLembur(payloadKirim).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.formLembur = { tanggal: '', jam_mulai: '', jam_selesai: '', keterangan: '' }; 
        this.ubahSegmen('riwayat'); 
      },
      error: (err) => alert('Gagal mengajukan lembur.')
    });
  }

  muatRiwayat() {
    this.absenService.getRiwayatLembur().subscribe({
      next: (res: any) => this.riwayat = res.data,
      error: (err) => console.log('Gagal muat riwayat:', err)
    });
  }
}