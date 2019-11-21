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

  localIndexDB: any
  remoteIndexDB: any

  clintData: any = null
  caseData: any = null

  constructor(
    private http: HttpClient,
  ) {  }

  // setup DB connections
  setupDB(dbIdentifierString:string) {
    this.localdb = new PouchDB(dbIdentifierString)
    this.localdb.info()
    .then(console.info('localDB successfully connected'))
    .catch(err=>console.error("ERROR! Unable to create local DB",err))


    let remoteDBAddress = ['http://localhost:5984',dbIdentifierString].join("/")
    // console.log(remoteDBAddress)
    // this.remoteDB = new PouchDB('http://localhost:5984/lawdocdb')
    this.remoteDB = new PouchDB(remoteDBAddress)
    this.remoteDB.info()
    .then(console.info("remoteDB successfully connected"))    
    .catch(err=>console.error("Unable to connect to remote DB", err))

  }

  setupIndex() {
    this.localIndexDB = new PouchDB('caselist')
    this.localIndexDB.info()
    .then(console.info("localIndexDB successfullycreated"))
    .catch(err=>console.error("Unable to create local IndexDB", err))

    this.remoteIndexDB = new PouchDB('http://localhost:5984/caselist')
    this.remoteIndexDB.info()
    .then(console.info("remoteDB successfully connected"))    
    .catch(err=>console.error("Unable to connect to remote DB", err))
    // this.remoteIndexDB.replicate.to(this.localIndexDB)
  }

  getStatusIndex() {
    return this.localIndexDB.allDocs({include_docs:true})
  }



  //Called by case-status page on initialization
  getCaseData(caseMarker: String) {
    return this.localdb.get(caseMarker)
  }

  // Called by case-status page to query directly to DB
  async queryCaseData(caseMarker: string): Promise<boolean> {
    let successStatus: boolean
    await this.remoteDB.get(caseMarker)
    // If File exists, replicate the file to localdb
    .then(async ()=>{
      await this.remoteDB.replicate.to(this.localdb, {doc_ids:[caseMarker], include_docs: true})
      // .on('complete', successStatus = true )
      successStatus = true
    })
    // if File doesn't exist, do nothing
    .catch(()=>{successStatus = false})

    return successStatus

  }


  createCaseData(inputCase: object) {
    return this.http.post('http://localhost:3000/api/case/lawfirmID/acc/create', inputCase)
  }
  
  
  deleteLocalIndexDB(){
    this.localIndexDB.destroy().then(console.info("LocalDBDestroyed"))
  }

  replicateToLocalIndexDB(){
    this.remoteIndexDB.replicate.to(this.localIndexDB)
  }


  // Dev utility functions
  getDB() {
    this.localdb.allDocs().then(ret => console.info(ret))
  }

  delDB() {
    this.localdb.destroy().then(() => {
      // this.setupDB()
    })
    
  }

  
}
