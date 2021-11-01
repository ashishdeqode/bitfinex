import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HStockComponent } from './h-stock.component';

describe('HStockComponent', () => {
  let component: HStockComponent;
  let fixture: ComponentFixture<HStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
