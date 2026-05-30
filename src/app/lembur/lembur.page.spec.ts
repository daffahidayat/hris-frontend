import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LemburPage } from './lembur.page';

describe('LemburPage', () => {
  let component: LemburPage;
  let fixture: ComponentFixture<LemburPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LemburPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
