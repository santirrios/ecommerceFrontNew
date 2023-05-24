import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureUsersComponent } from './configure-users.component';

describe('ConfigureUsersComponent', () => {
  let component: ConfigureUsersComponent;
  let fixture: ComponentFixture<ConfigureUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
