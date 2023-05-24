import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProComponent } from './update-pro.component';

describe('UpdateProComponent', () => {
  let component: UpdateProComponent;
  let fixture: ComponentFixture<UpdateProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
