import { CaseStatusService } from './../../services/case-status/case-status.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-case-index',
  templateUrl: './case-index.component.html',
  styleUrls: ['./case-index.component.scss']
})
export class CaseIndexComponent implements OnInit {
  dataList : [{}]
  displayCols = ["_id", "typ", "caseID", "client","status"]
  caseList: MatTableDataSource<{}>

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:true}) sort: MatSort
  constructor(
    private router: Router,
    private caseStatusService: CaseStatusService
  ) { }

  createCase(){
    this.router.navigate(["opencase"])
  }

  applyFilter(filterValue: string){
    this.caseList.filter = filterValue.trim().toLowerCase()
  }


  dblClick(row){
    let targetRoute = ['case-status','lawfirmID', row.typ, row._id].join('/')
    this.router.navigate(['case-status','lawfirmID', row.typ, row._id])
    // this.router.navigate([targetRoute])

  }

  deleteLocalIndexDB(){
    this.caseStatusService.deleteLocalIndexDB()
  }

  replicateToLocalIndexDB(){
    this.caseStatusService.replicateToLocalIndexDB()
  }

  ngOnInit() {
    this.caseStatusService.setupIndex()

    this.caseStatusService.getStatusIndex()
    .then(
      ret=>{
        console.info("File found in localDB", ret);
        let tempval = []
        for(let item of ret.rows){
          tempval.push(item.doc)
        }

        console.info("THIS IS TEMPVAL", tempval)
        this.caseList = new MatTableDataSource(tempval)
        // this.caseList = new MatTableDataSource(this.dataList)
        this.caseList.paginator = this.paginator
        this.caseList.sort = this.sort
      })
    .catch(err => console.error("An error happened!"))

  }

}
