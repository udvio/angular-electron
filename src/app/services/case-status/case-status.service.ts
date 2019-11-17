import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import PouchDB from 'pouchdb';
import 'rxjs/add/observable/from'


@Injectable({
  providedIn: 'root'
})
export class CaseStatusService {
  localdb: any
  remoteDB: any
  clintData: any = null
  caseData: any = null

  constructor(
    private http: HttpClient,
  ) {  }

  setupDB() {
    this.localdb = new PouchDB('lawDocDB')
    console.info('DB successfully generated')
    console.info(this.localdb.info())

    this.remoteDB = new PouchDB('http://localhost:5984/lawdocdb')
    console.info("remote DB connected")
    console.info(this.remoteDB.info())
    
  }



  //Called by case-status page
  getCaseData(caseMarker: String) {
    return this.localdb.get(caseMarker)
  }


  async queryCaseData(caseMarker: string): Promise<boolean> {
    let successStatus: boolean
    await this.remoteDB.get(caseMarker)
    // If File exists, replicate the file to localdb
    .then(()=>{
      this.remoteDB.replicate.to(this.localdb, {doc_ids:[caseMarker], include_docs: true})
      successStatus = true
    })
    // if File doesn't exist, do nothing
    .catch(()=>{successStatus = false})


    return successStatus

  }


  createCaseData(inputCase: object) {
    return this.http.post('http://localhost:3000/api/case/lawfirmID/acc/create', inputCase)
    
  }


  getDB() {
    this.localdb.allDocs().then(ret => console.info(ret))
  }

  delDB() {
    this.localdb.destroy().then(() => {
      this.setupDB()
    })
    
  }

  
}
