import { AppConfig } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import 'rxjs/add/observable/from'
var urljoin = require('url-join')


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


    // let remoteDBAddress = ['http://localhost:5984',dbIdentifierString].join("/")
    // let remoteDBAddress = [AppConfig.dbAddress,dbIdentifierString].join("/")
    let remoteDBAddress = urljoin(AppConfig.dbAddress,dbIdentifierString)

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

    let remoteUrl = urljoin(AppConfig.dbAddress,'caselist')
    // this.remoteIndexDB = new PouchDB('http://localhost:5984/caselist')
    this.remoteIndexDB = new PouchDB(remoteUrl)
    this.remoteIndexDB.info()
    .then(console.info("remoteIndexDB successfully connected"))    
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
    let createCaseURL = urljoin(AppConfig.serverAddress,'create')
    // return this.http.post('http://localhost:3000/api/case/lawfirmID/acc/create', inputCase)
    return this.http.post(createCaseURL, inputCase)
  }
  
  
  // Dev utility functions  
  deleteLocalIndexDB(){
    this.localIndexDB.destroy().then(console.info("LocalDBDestroyed"))
  }

  replicateToLocalIndexDB(){
    this.remoteIndexDB.replicate.to(this.localIndexDB)
  }

  getDB() {
    this.localdb.allDocs().then(ret => console.info(ret))
  }

  delDB() {
    this.localdb.destroy().then(() => {
      // this.setupDB()
    })
    
  }

  
}
