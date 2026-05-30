import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminLemburPage } from './admin-lembur.page';

describe('AdminLemburPage', () => {
  let component: AdminLemburPage;
  let fixture: ComponentFixture<AdminLemburPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLemburPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
