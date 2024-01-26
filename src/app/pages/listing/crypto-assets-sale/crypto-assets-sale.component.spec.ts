import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoAssetsSaleComponent } from './crypto-assets-sale.component';

describe('CryptoAssetsSaleComponent', () => {
  let component: CryptoAssetsSaleComponent;
  let fixture: ComponentFixture<CryptoAssetsSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoAssetsSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoAssetsSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
