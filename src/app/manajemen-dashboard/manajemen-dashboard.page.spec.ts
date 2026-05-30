import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManajemenDashboardPage } from './manajemen-dashboard.page';

describe('ManajemenDashboardPage', () => {
  let component: ManajemenDashboardPage;
  let fixture: ComponentFixture<ManajemenDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManajemenDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
