import { TestBed, inject } from '@angular/core/testing';

import { EscposPrintService } from './escpos-print.service';

describe('EscposPrintService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EscposPrintService]
    });
  });

  it('should be created', inject([EscposPrintService], (service: EscposPrintService) => {
    expect(service).toBeTruthy();
  }));
});
