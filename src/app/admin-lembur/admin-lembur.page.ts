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
import { checkmarkCircleOutline, closeCircleOutline, timeOutline, personOutline, calendarOutline, chevronDownCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-admin-lembur',
  templateUrl: './admin-lembur.page.html',
  styleUrls: ['./admin-lembur.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonBadge, IonButton, IonIcon, 
    IonRefresher, IonRefresherContent,
    CommonModule, FormsModule
  ]
})
export class AdminLemburPage implements OnInit {

  listLembur: any[] = [];

  constructor(private absenService: AbsenService) {
    addIcons({ checkmarkCircleOutline, closeCircleOutline, timeOutline, personOutline, calendarOutline, chevronDownCircleOutline });
  }

  ngOnInit() {
    this.muatDataLembur();
  }

  handleRefresh(event: any) {
    this.muatDataLembur();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  muatDataLembur() {
    this.absenService.getAdminLembur().subscribe({
      next: (res: any) => {
        this.listLembur = res.data;
      },
      error: (err) => console.log('Gagal muat data lembur', err)
    });
  }

  ubahStatus(id: number, statusBaru: string) {
    // Validasi konfirmasi biar HRD gak salah pencet
    const konfirmasi = confirm(`Yakin mau ${statusBaru === 'approved' ? 'MENYETUJUI' : 'MENOLAK'} lembur ini?`);
    if (!konfirmasi) return;

    this.absenService.updateStatusLembur(id, statusBaru).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.muatDataLembur(); // Refresh data otomatis setelah di-ACC/Tolak
      },
      error: (err) => alert('Gagal update status lembur!')
    });
  }
}