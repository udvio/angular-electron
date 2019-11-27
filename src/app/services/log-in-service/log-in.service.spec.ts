import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { LogInService } from './log-in.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/from'

describe('LogInService', () => {
  let service : LogInService
  beforeEach(() => {TestBed.configureTestingModule({
    // imports: [HttpClientTestingModule],
    providers: [
      LogInService,
      {provide: HttpClient, useClass: HttpClientTestingModule}
    ]
  }); 
  service = TestBed.get(LogInService)
});

  it('should be created', () => {
    
    expect(service).toBeTruthy();
  });

  it('should return a boolean', () => {
    // const result = logInService.isLoggedIn()
    const result = service.isLoggedIn()
    expect(typeof(result)).toEqual('boolean')
  })

  // it('should set token', () => {
  //   spyOn(service,'getAccess'). and.callFake( () => {
  //     return Observable.from({'token':'tokenValue'}})
  //   }) 

    

  // })
  
});
