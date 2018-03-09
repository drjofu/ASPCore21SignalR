import { TestBed, inject } from '@angular/core/testing';

import { SignalrCityService } from './signalr-city.service';

describe('SignalrCityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignalrCityService]
    });
  });

  it('should be created', inject([SignalrCityService], (service: SignalrCityService) => {
    expect(service).toBeTruthy();
  }));
});
