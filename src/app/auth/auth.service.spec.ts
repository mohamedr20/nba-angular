import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });
  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});

describe('Google OAuth',()=>{
  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers:[AuthService]
    })
  })
})