import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon 
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { personAddOutline, logOutOutline, businessOutline } from 'ionicons/icons';

@Component({
  selector: 'app-manajemen-dashboard',
  templateUrl: './manajemen-dashboard.page.html',
  styleUrls: ['./manajemen-dashboard.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonIcon]
})
export class ManajemenDashboardPage implements OnInit {

  constructor(private router: Router) { 
    addIcons({ personAddOutline, logOutOutline, businessOutline });
  }

  ngOnInit() {}

  bukaTambahKaryawan() {
    this.router.navigate(['/tambah-karyawan']);
  }

  logout() {
    localStorage.removeItem('token_absen');
    this.router.navigate(['/login']);
  }
}