import { TestBed, inject } from '@angular/core/testing';

import { AccessResolverService } from './access-resolver.service';

describe('AccessResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccessResolverService]
    });
  });

  it('should be created', inject([AccessResolverService], (service: AccessResolverService) => {
    expect(service).toBeTruthy();
  }));
});
