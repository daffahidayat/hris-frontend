import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto'; 
import { 
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButtons, IonButton, IonGrid, IonRow, IonCol,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonBadge,
  IonIcon // <-- 1. IMPORT IONICON DI SINI
} from '@ionic/angular/standalone';

import { AbsenService } from '../services/absen'; 

// --- 2. IMPORT PLUGIN IKON DI SINI ---
import { addIcons } from 'ionicons';
import { 
  logOutOutline, personAddOutline, pieChartOutline, 
  analyticsOutline, documentTextOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, 
    CommonModule, FormsModule,
    IonButtons, IonButton, IonGrid, IonRow, IonCol,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonCardContent, IonBadge,
    IonIcon // <-- 3. DAFTARIN IONICON KE COMPONENT
  ]
})
export class AdminDashboardPage implements OnInit {
  
  dataKaryawan: any[] = [];
  centroid: any = {};
  totalIterasi: number = 0;
  daftarIzin: any[] = [];

  // --- VAR BUAT CHART ---
  chartAbsen: any;

  constructor(
    private absenService: AbsenService,
    private router: Router
  ) { 
    // --- 4. DAFTARIN NAMA-NAMA IKONNYA DI SINI ---
    addIcons({
      logOutOutline, personAddOutline, pieChartOutline, 
      analyticsOutline, documentTextOutline
    });
  }

  ngOnInit() {
    this.muatDataAnalisis();
    this.muatDataIzin(); 
  }

  // --- INI YANG BENER BRO, PINDAH KE SINI ---
  ionViewDidEnter() {
    this.muatGrafik(); 
  }

  muatDataAnalisis() {
    this.absenService.getKlaster().subscribe({
      next: (res: any) => {
        this.dataKaryawan = res.data;
        this.centroid = res.centroid_akhir;
        this.totalIterasi = res.total_iterasi;
      },
      error: (err) => console.error('Waduh gagal ambil data analisis:', err)
    });
  }

  muatDataIzin() {
    this.absenService.getDaftarIzin().subscribe({
      next: (res: any) => {
        this.daftarIzin = res.data;
      },
      error: (err) => console.error('Gagal ambil data izin', err)
    });
  }

  // --- LOGIKA GRAFIK UNTUK ADMIN ---
  muatGrafik() {
    this.absenService.getStatAdmin().subscribe({
      next: (res: any) => {
        // Render grafik pake data dari Laravel (tepat_waktu & terlambat)
        this.renderPieChart(res.tepat_waktu, res.terlambat);
      },
      error: (err) => console.error('Gagal ambil statistik grafik:', err)
    });
  }

  renderPieChart(tepat: number, telat: number) {
    const canvas = document.getElementById('absenPieChart') as HTMLCanvasElement;
    if (!canvas) return;

    // Hancurkan chart lama biar gak error pas refresh data
    if (this.chartAbsen) {
      this.chartAbsen.destroy();
    }

    this.chartAbsen = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Tepat Waktu', 'Terlambat'],
        datasets: [{
          data: [tepat, telat],
          backgroundColor: ['#2dd36f', '#eb445a'], // Ijo (Tepat), Merah (Telat)
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#2c3e50' } // <-- Warna teks diubah biar kebaca di background putih
          }
        }
      }
    });
  }

  prosesIzin(id: number, statusBaru: string) {
    this.absenService.updateStatusIzin(id, statusBaru).subscribe({
      next: (res: any) => {
        alert(`Status berhasil diubah jadi: ${statusBaru.toUpperCase()}`);
        this.muatDataIzin();
      },
      error: (err) => alert('Gagal memproses izin. Cek koneksi.')
    });
  }

  bukaTambahKaryawan() {
    this.router.navigate(['/tambah-karyawan']);
  }

  logout() {
    localStorage.removeItem('token_absen');
    this.router.navigate(['/login']);
  }
}