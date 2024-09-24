import { TestBed } from '@angular/core/testing';

import { SdkPlayerServiceService } from './sdk-player-service.service';

describe('SdkPlayerServiceService', () => {
  let service: SdkPlayerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SdkPlayerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
