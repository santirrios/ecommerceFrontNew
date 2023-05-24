import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureProductsComponent } from './configure-products.component';

describe('ConfigureProductsComponent', () => {
  let component: ConfigureProductsComponent;
  let fixture: ComponentFixture<ConfigureProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
