import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import PouchDB from 'pouchdb';
import 'rxjs/add/observable/from'


@Injectable({
  providedIn: 'root'
})
export class CaseStatusService {
  db: any
  clintData: any = null
  caseData: any = null

  constructor(
    private http: HttpClient,
  ) {  }

  setupDB() {
    this.db = new PouchDB('lawDocDB')
    console.info('DB successfully generated')
    console.info(this.db.info())
    
  }


  whatIsCurrentCaseData() {
    return this.caseData
  }

  //Called by case-status page
  getCaseData(caseMarker?: String) {
    return this.db.get(caseMarker)
    // Observable.from(this.db.get(caseMarker)).pipe(
    //   map(resp => {console.info(resp); return resp}),
    //   catchError( (err)=> {console.info(err); return throwError("HAHAHAH")})
    // )
  }

  //called by open-case child component or casedashboard component
  //dummy input will modify query
  queryCaseData(dummy) {
    return this.http.get('http://localhost:3000/api/case').pipe(
      map(queryResponse => {
        this.caseData = queryResponse
        // this.caseData = this.caseProcessing(queryResponse);
        console.info("CaseStatusService:: Success")
        return queryResponse
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


  putDB(caseInfo: Object) {
    let randoObj = {'_id':"case ID", case:"FOOLS"}
    // this.db.put(caseInfo)
    this.db.put(randoObj).catch( err=> console.info(err))
  }

  getDB() {
    // this.db.get("case ID").then(ret=> console.info(ret))
    this.db.allDocs().then(ret => console.info(ret))
  }

  delDB() {
    this.db.get("case ID")
    .then( (retDoc) => {return this.db.remove(retDoc)})
    .catch( err => console.info(err))
    
  }

  
}
