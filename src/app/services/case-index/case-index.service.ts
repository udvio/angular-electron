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
  syncHandler: any

  clintData: any = null
  caseData: any = null

  constructor(
    private http: HttpClient,
  ) { 

   }

  setupIndex() {
    // sets up local index DB. Will create a db if not present for first time start up
    this.localIndexDB = new PouchDB('caselist', {auto_compaction:true})
    this.localIndexDB.info()
    .then(returned=>{console.info("localIndexDB successfullycreated"); console.log(returned)})
    .catch(err=>console.error("Unable to create local IndexDB", err))


    // will connect to external server.
    let remoteUrl = urljoin(AppConfig.dbAddress,'caselist')
    this.remoteIndexDB = new PouchDB(remoteUrl)
    this.remoteIndexDB.info()
    .then((returned)=>{
      console.log(returned)
    })
    .catch(err=>{console.error("Unable to connect to remote DB", err)})
    //TODO add in some message indicating that it failed to connect to remote.

    this.syncHandler=this.localIndexDB.sync(this.remoteIndexDB, {
      live: true,
      retry: true
    })
  }

  getStatusIndex() {
    return this.localIndexDB.allDocs({include_docs:true})
  }

  getSyncHandler() {
    return this.syncHandler
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
