import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TambahKaryawanPage } from './tambah-karyawan.page';

describe('TambahKaryawanPage', () => {
  let component: TambahKaryawanPage;
  let fixture: ComponentFixture<TambahKaryawanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TambahKaryawanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
