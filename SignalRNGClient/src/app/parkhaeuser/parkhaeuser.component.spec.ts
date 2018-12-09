import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkhaeuserComponent } from './parkhaeuser.component';

describe('ParkhaeuserComponent', () => {
  let component: ParkhaeuserComponent;
  let fixture: ComponentFixture<ParkhaeuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkhaeuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkhaeuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
