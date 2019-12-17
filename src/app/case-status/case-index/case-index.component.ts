import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfig } from './../../../environments/environment';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy, NgZone } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import PouchDB from 'pouchdb'
import { CaseIndexService } from '../../services/case-index/case-index.service';
var urljoin = require('url-join')


@Component({
  selector: 'app-case-index',
  templateUrl: './case-index.component.html',
  styleUrls: ['./case-index.component.scss']
})
export class CaseIndexComponent implements OnInit, OnDestroy {
  dataList : [{}]
  displayCols = ["_id", "typ", "caseID", "client","status"]
  caseList: MatTableDataSource<{}>
  localIndexDB: any
  remoteIndexDB: any
  syncHandler: any
  remoteSuccess: boolean = true
  

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:true}) sort: MatSort
  constructor(
    private router: Router,
    private caseIndexService: CaseIndexService,
    private _snackBar: MatSnackBar,
    private _zone: NgZone
  ) { }

  createCase(){
    this.router.navigate(["opencase"])
  }

  applyFilter(filterValue: string){
    this.caseList.filter = filterValue.trim().toLowerCase()
  }


  dblClick(row){
    this.router.navigate(['case-status','lawfirmID', row.typ, row._id])
  }

  // dev funcs
  deleteLocalIndexDB(){
    // this.localIndexDB.destroy().then(this.refreshTable())
    this.caseIndexService.deleteLocalIndexDB()
  }

  replicateToLocalIndexDB(){
    // this.caseIndexService.replicateToLocalIndexDB()
    this.remoteIndexDB.replicate.to(this.localIndexDB)
    .on('complete', ()=>this.refreshTable())
  }

  refreshTable(){
    // this.localIndexDB.allDocs({include_docs:true})
    this.caseIndexService.getStatusIndex()
    .then(
      ret=>{
        console.info("File found in localDB", ret);
        let tempval = []
        for(let item of ret.rows){
          tempval.push(item.doc)
        }

        this.caseList = new MatTableDataSource(tempval)
        this.caseList.paginator = this.paginator
        this.caseList.sort = this.sort

        this._snackBar.dismiss()
      })
    .catch(err => console.error("An error happened!"))
  }

  openNotification(){
    this._snackBar.open("Changes Detected. Refresh Page?", "Yes", {duration:30000})
      .onAction().subscribe(()=>{
        this.refreshTable()
        this._snackBar.open("Updating table...", "", {duration: 5000})
      })
  }

  ngOnInit() {
    this.caseIndexService.setupIndex()
    this.refreshTable()
  }

  ngAfterContentInit(){
    this.syncHandler = this.caseIndexService.getSyncHandler()
    this.syncHandler
    .on('change', ()=>{
      if (this.caseList.data.length!=0) {
        this._zone.run(()=>this.openNotification())
      }
    })
    .on('paused', ()=>{
      if (this.caseList.data.length===0){
        this._zone.run(()=>this.refreshTable())
      }
      console.log("Replication paused")
    })
    .on('active', ()=>console.log("Replication continued"))
    .on('error', ()=>console.log("This shouldnt happen"))
  }

  ngOnDestroy() {
    this.syncHandler.removeAllListeners()
  }

}
