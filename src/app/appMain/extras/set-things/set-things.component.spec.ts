import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetThingsComponent } from './set-things.component';

describe('SetThingsComponent', () => {
  let component: SetThingsComponent;
  let fixture: ComponentFixture<SetThingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetThingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetThingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
