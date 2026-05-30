import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonBadge, IonIcon, IonButton
} from '@ionic/angular/standalone';
import { AbsenService } from '../services/absen';
import { addIcons } from 'ionicons';
import { cashOutline, calendarOutline, walletOutline, downloadOutline, removeCircleOutline, addCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-slip-gaji',
  templateUrl: './slip-gaji.page.html',
  styleUrls: ['./slip-gaji.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonBadge, IonIcon, IonButton,
    CommonModule, FormsModule
  ]
})
export class SlipGajiPage implements OnInit {

  listSlip: any[] = [];

  constructor(private absenService: AbsenService) {
    addIcons({ cashOutline, calendarOutline, walletOutline, downloadOutline, removeCircleOutline, addCircleOutline });
  }

  ngOnInit() {
    this.muatSlipGaji();
  }

  muatSlipGaji() {
    this.absenService.getSlipGaji().subscribe({
      next: (res: any) => {
        this.listSlip = res.data;
      },
      error: (err: any) => console.error('Gagal ambil data slip gaji', err)
    });
  }

  formatRupiah(angka: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  }

  downloadSlip(periode: string) {
    alert(`Fitur Download PDF untuk ${periode} sedang dalam pengembangan! 🚀`);
  }
}