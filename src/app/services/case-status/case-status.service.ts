import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CaseStatusService {
  clintData: any = null
  caseData: any = null

  constructor(
    private http: HttpClient,
  ) { }

  whatIsCurrentCaseData() {
    return this.caseData
  }

  //Called by case-status page
  getCaseData() {
    let returningCase = this.caseData
    this.caseData = null
    return returningCase
  }

  //called by open-case child component or casedashboard component
  //dummy input will modify query
  queryCaseData(dummy) {
    return this.http.get('http://localhost:3000/api/case').pipe(
      map(queryResponse => {
        this.caseData = queryResponse
        // this.caseData = this.caseProcessing(queryResponse);
        return true
      }),
      catchError(error => {
        return throwError("An Error occurred: ", error)
      })
    )
  }

  caseProcessing(inputCase) {
    inputCase['startDate'] = new Date(inputCase['startDate'])
    for (let phases in inputCase['casePhases']) {
      for (let files in inputCase['casePhases'][phases]['fileInfo']){
        
      }
    }
  }

  createCaseData(inputCase: object) {
    return this.http.post('http://localhost:3000/api/case/lawfirmID/acc/create', inputCase)
    
  }

  deleteCaseData() {
    this.caseData = null
  }

  
}
