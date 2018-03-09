import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenzinpreiseComponent } from './benzinpreise.component';

describe('BenzinpreiseComponent', () => {
  let component: BenzinpreiseComponent;
  let fixture: ComponentFixture<BenzinpreiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenzinpreiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenzinpreiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
