/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GitHubService } from './github.service';

describe('Service: Github', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GitHubService]
    });
  });

  it('should ...', inject([GitHubService], (service: GitHubService) => {
    expect(service).toBeTruthy();
  }));
});
