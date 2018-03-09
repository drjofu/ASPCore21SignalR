import { TestBed, inject } from '@angular/core/testing';

import { SignalrChatService } from './signalr-chat.service';

describe('SignalrChatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignalrChatService]
    });
  });

  it('should be created', inject([SignalrChatService], (service: SignalrChatService) => {
    expect(service).toBeTruthy();
  }));
});
