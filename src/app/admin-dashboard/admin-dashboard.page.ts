import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto'; 
import { 
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButtons, IonButton, IonGrid, IonRow, IonCol,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonBadge, IonIcon 
} from '@ionic/angular/standalone';

import { AbsenService } from '../services/absen'; 

import { addIcons } from 'ionicons';
// Ikon cashOutline UDAH DITAMBAHIN DI SINI
import { 
  logOutOutline, pieChartOutline, analyticsOutline, documentTextOutline, timeOutline, cashOutline
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
    IonCardContent, IonBadge, IonIcon 
  ]
})
export class AdminDashboardPage implements OnInit {
  
  dataKaryawan: any[] = [];
  centroid: any = {};
  totalIterasi: number = 0;
  chartAbsen: any; // <-- Variabel daftarIzin jadul udah gua buang biar bersih

  constructor(
    private absenService: AbsenService,
    private router: Router
  ) { 
    // Ikon cashOutline DIDAFTARIN DI SINI
    addIcons({
      logOutOutline, pieChartOutline, analyticsOutline, documentTextOutline, timeOutline, cashOutline
    });
  }

  ngOnInit() {
    this.muatDataAnalisis();
  }

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

  muatGrafik() {
    this.absenService.getStatAdmin().subscribe({
      next: (res: any) => {
        this.renderPieChart(res.tepat_waktu, res.terlambat);
      },
      error: (err) => console.error('Gagal ambil statistik grafik:', err)
    });
  }

  renderPieChart(tepat: number, telat: number) {
    const canvas = document.getElementById('absenPieChart') as HTMLCanvasElement;
    if (!canvas) return;

    if (this.chartAbsen) {
      this.chartAbsen.destroy();
    }

    this.chartAbsen = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Tepat Waktu', 'Terlambat'],
        datasets: [{
          data: [tepat, telat],
          backgroundColor: ['#2dd36f', '#eb445a'], 
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#2c3e50' } 
          }
        }
      }
    });
  }

  keAdminLembur() {
    this.router.navigate(['/admin-lembur']);
  }

  keAdminIzin() {
    this.router.navigate(['/admin-izin']);
  }

  // --- INI FUNGSI BUAT HITUNG GAJI (Tadi belum lu masukin) ---
  generateGaji() {
    const konfirmasi = confirm('Yakin mau hitung dan terbitkan slip gaji bulan ini untuk semua karyawan?');
    if (!konfirmasi) return;

    this.absenService.generatePayroll().subscribe({
      next: (res: any) => {
        alert(res.message); 
      },
      error: (err) => alert('Gagal generate payroll! Cek koneksi backend.')
    });
  }

  logout() {
    localStorage.removeItem('token_absen');
    this.router.navigate(['/login']);
  }
}