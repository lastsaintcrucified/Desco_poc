import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTenantsComponent } from './list-tenants.component';

describe('ListTenantsComponent', () => {
  let component: ListTenantsComponent;
  let fixture: ComponentFixture<ListTenantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTenantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
