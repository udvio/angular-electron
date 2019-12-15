import { AppConfig } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import 'rxjs/add/observable/from'
import { CompileTemplateMetadata } from '@angular/compiler';
var urljoin = require('url-join')

@Injectable({
  providedIn: 'root'
})
export class CaseIndexService {
  localIndexDB: any
  remoteIndexDB: any

  clintData: any = null
  caseData: any = null

  constructor(
    private http: HttpClient,
  ) {  }

  setupIndex() {
    this.localIndexDB = new PouchDB('caselist')
    this.localIndexDB.info()
    .then(console.info("localIndexDB successfullycreated"))
    .catch(err=>console.error("Unable to create local IndexDB", err))

    let remoteUrl = urljoin(AppConfig.dbAddress,'caselist')
    // this.remoteIndexDB = new PouchDB('http://localhost:5984/caselist')
    this.remoteIndexDB = new PouchDB(remoteUrl)
    this.remoteIndexDB.info()
    .then(()=>{
      console.info("remoteIndexDB successfully connected");
      this.replicateToLocalIndexDB()
    })
    .catch(err=>console.error("Unable to connect to remote DB", err))
    // this.remoteIndexDB.replicate.to(this.localIndexDB)


  }

  getStatusIndex() {
    return this.localIndexDB.allDocs({include_docs:true})
  }

  checkChanges() {
    // return this.remoteIndexDB.changes({
    //   since: 
    // })
  }
 
  
  // Dev utility functions  
  deleteLocalIndexDB(){
    this.localIndexDB.destroy().then(console.info("LocalDBDestroyed"))
  }

  async replicateToLocalIndexDB(){
    this.remoteIndexDB.replicate.to(this.localIndexDB)
    .on('complete', ()=>console.log("COMPLETED"))

  }

  
}
