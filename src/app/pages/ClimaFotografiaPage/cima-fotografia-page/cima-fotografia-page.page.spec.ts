import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CimaFotografiaPagePage } from './cima-fotografia-page.page';

describe('CimaFotografiaPagePage', () => {
  let component: CimaFotografiaPagePage;
  let fixture: ComponentFixture<CimaFotografiaPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CimaFotografiaPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
