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
  {
    path: 'manajemen-dashboard',
    loadComponent: () => import('./manajemen-dashboard/manajemen-dashboard.page').then( m => m.ManajemenDashboardPage)
  },
  {
    path: 'lembur',
    loadComponent: () => import('./lembur/lembur.page').then( m => m.LemburPage)
  },
  {
    path: 'admin-lembur',
    loadComponent: () => import('./admin-lembur/admin-lembur.page').then( m => m.AdminLemburPage)
  },
  {
    path: 'admin-izin',
    loadComponent: () => import('./admin-izin/admin-izin.page').then( m => m.AdminIzinPage)
  },

  {
    path: 'slip-gaji',
    loadComponent: () => import('./slip-gaji/slip-gaji.page').then( m => m.SlipGajiPage)
  },
];