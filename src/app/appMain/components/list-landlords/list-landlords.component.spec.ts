import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLandlordsComponent } from './list-landlords.component';

describe('ListLandlordsComponent', () => {
  let component: ListLandlordsComponent;
  let fixture: ComponentFixture<ListLandlordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLandlordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLandlordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
