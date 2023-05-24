import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProComponent } from './delete-pro.component';

describe('DeleteProComponent', () => {
  let component: DeleteProComponent;
  let fixture: ComponentFixture<DeleteProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
