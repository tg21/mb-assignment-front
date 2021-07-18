import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMeuComponent } from './nav-menu.component';

describe('NavMeuComponent', () => {
  let component: NavMeuComponent;
  let fixture: ComponentFixture<NavMeuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavMeuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
