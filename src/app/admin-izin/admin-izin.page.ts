import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonBadge, IonButton, IonIcon, 
  IonRefresher, IonRefresherContent
} from '@ionic/angular/standalone';
import { AbsenService } from '../services/absen';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, closeCircleOutline, documentTextOutline, personOutline, calendarOutline, chevronDownCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-admin-izin',
  templateUrl: './admin-izin.page.html',
  styleUrls: ['./admin-izin.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonBadge, IonButton, IonIcon, 
    IonRefresher, IonRefresherContent,
    CommonModule, FormsModule
  ]
})
export class AdminIzinPage implements OnInit {

  daftarIzin: any[] = [];

  constructor(private absenService: AbsenService) {
    addIcons({ checkmarkCircleOutline, closeCircleOutline, documentTextOutline, personOutline, calendarOutline, chevronDownCircleOutline });
  }

  ngOnInit() {
    this.muatDataIzin();
  }

  handleRefresh(event: any) {
    this.muatDataIzin();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  muatDataIzin() {
    this.absenService.getDaftarIzin().subscribe({
      next: (res: any) => {
        this.daftarIzin = res.data;
      },
      error: (err) => console.log('Gagal muat data izin', err)
    });
  }

  prosesIzin(id: number, statusBaru: string) {
    const konfirmasi = confirm(`Yakin mau ${statusBaru === 'approved' ? 'MENYETUJUI' : 'MENOLAK'} izin ini?`);
    if (!konfirmasi) return;

    this.absenService.updateStatusIzin(id, statusBaru).subscribe({
      next: (res: any) => {
        alert(`Status izin berhasil diubah jadi: ${statusBaru.toUpperCase()}`);
        this.muatDataIzin(); // Refresh data otomatis
      },
      error: (err) => alert('Gagal update status izin!')
    });
  }
}