
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { HttpClient } from '@angular/common/http';

xdescribe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard, 
        {provide: Router, useClass: class{navigate = jasmine.createSpy('navigate')}}, 
        {provide: HttpClient, useClass: HttpClientTestingModule}]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    // pending()
    expect(guard).toBeTruthy();
  }));
});
