import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureCategoriesComponent } from './configure-categories.component';

describe('ConfigureCategoriesComponent', () => {
  let component: ConfigureCategoriesComponent;
  let fixture: ComponentFixture<ConfigureCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
