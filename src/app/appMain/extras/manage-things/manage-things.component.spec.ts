import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageThingsComponent } from './manage-things.component';

describe('ManageThingsComponent', () => {
  let component: ManageThingsComponent;
  let fixture: ComponentFixture<ManageThingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageThingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageThingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
