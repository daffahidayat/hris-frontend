import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminIzinPage } from './admin-izin.page';

describe('AdminIzinPage', () => {
  let component: AdminIzinPage;
  let fixture: ComponentFixture<AdminIzinPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIzinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
