import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { CaseStatusService } from './../../services/case-status/case-status.service';
import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { ValueTransformer } from '@angular/compiler/src/util';
import { ICasePhase } from '../../Interfaces/caseData.interface';
import { AstMemoryEfficientTransformer, ConditionalExpr } from '@angular/compiler';
import * as moment from 'moment';


@Component({
  selector: 'app-case-status',
  templateUrl: './case-status.component.html',
  styleUrls: ['./case-status.component.scss']
})
export class CaseStatusComponent implements OnInit {
  caseData : Object;
  caseDataKeys : String[]
  // casePhases: ICasePhase;
  phaseStatusToPrintable = {
    'done' : 'Complete',
    'ongoing' : 'OnGoing',
    'notStarted' : "Not Started"
  };
  caseDueDates: Object;

  constructor(
    private caseStatusService: CaseStatusService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }


  casePhases(someCaseData) {
    return Object.keys(this.caseData["casePhases"])
  }

  printDate(inputDate: string) {
    return moment(new Date(inputDate)).format("D MMMM YYYY")
  }

  goBack() {
    this.router.navigate(['case-index'])
  }


  calculateDaysToOverdue(fileDueDate:number) {
    let today = moment(new Date())
    let dueDate = moment(new Date(fileDueDate))
    let daysToOverdue = dueDate.diff(today,'days')
    return daysToOverdue
  }


  getDB(){
    this.caseStatusService.getDB()
  }

  resetDB() {
    this.caseStatusService.delDB()
  }
  consoleCase(){
    console.info(this.caseData)
    console.info(typeof(this.caseData['startDate']))
  }

  getID(){
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(id)
  }

  async ngOnInit() {
    console.info("RUNNING ngOnInit")
    
    // look into DB for the current case
    // let queryString = "lawfirmID/acc/CaseID" //change to pull from activeRoute
    let firm = this.activatedRoute.snapshot.paramMap.get('firm')
    let typ = this.activatedRoute.snapshot.paramMap.get('typ')
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    this.caseStatusService.setupDB(typ.toLowerCase())
    console.log(id)


    this.caseStatusService.getCaseData(id).then(
      ret=>{
        console.info("File found in localDB", ret);
        this.caseData = ret
      })
    //cannot find case in local db
    .catch( async err => {
      if (err.status === 404) {
        console.info("File not found in localDB", err);
        let docExists = await this.caseStatusService.queryCaseData(id)
        if (docExists===true) {
          this.ngOnInit()
        } else {
          console.info("File Not Found in remoteDB")
        }

    }})

  }

}
