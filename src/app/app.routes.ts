import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login', // <-- Nah ini yang diganti bro, tadinya 'home'
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'admin-dashboard',
    loadComponent: () => import('./admin-dashboard/admin-dashboard.page').then( m => m.AdminDashboardPage)
  },
  {
    path: 'pengajuan-izin',
    loadComponent: () => import('./pengajuan-izin/pengajuan-izin.page').then( m => m.PengajuanIzinPage)
  },
  {
    path: 'profil',
    loadComponent: () => import('./profil/profil.page').then( m => m.ProfilPage)
  },
  {
    path: 'tambah-karyawan',
    loadComponent: () => import('./tambah-karyawan/tambah-karyawan.page').then( m => m.TambahKaryawanPage)
  },
];