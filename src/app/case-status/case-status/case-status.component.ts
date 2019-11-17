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
    private caseStatusService: CaseStatusService
  ) { }

  loopButton() {
    console.info("Current Case Data Is", this.caseStatusService.whatIsCurrentCaseData())
  }

  casePhases(someCaseData) {
    return Object.keys(this.caseData["casePhases"])
  }

  calculateDueDate(daysDuration:number) {
    // let startDate = moment([this.caseData['startDate'].getFullYear(), this.caseData['startDate'].getMonth()-1, this.caseData['startDate'].getDate()])
    let startDate = moment(this.caseData['startDate'])
    let dueDate = startDate.add(daysDuration,'days')
    return dueDate.format("D MMMM YYYY")
  }

  calculateDaysToOverdue(daysDuration:number) {
    let today = moment(new Date())
    let startDate = moment(this.caseData['startDate'])
    let dueDate = startDate.add(daysDuration,'days')
    let daysToOverdue = dueDate.diff(today,'days')
    return daysToOverdue
  }


  calculatePhaseDueDate(phaseIdentifier: string){
    let files = this.caseData['casePhases'][phaseIdentifier]['fileInfo']
    let maxDuration = 0
    for (let file in files) {
      if (files[file]['duration'] > maxDuration) {
        maxDuration = files[file]['duration']
      }
    }
    
    let startDate = moment(this.caseData['startDate'])
    return startDate.add(maxDuration,'days').format("D MMMM YYYY")
  }

  putDB(){
    this.caseStatusService.putDB(this.caseData)
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






  async ngOnInit() {
    this.caseStatusService.setupDB()
    // look into DB for the current case
    this.caseStatusService.getCaseData('someData').then(
      ret=>{
        console.info("Positive Return", ret);
        this.caseData = ret
      })
    .catch( err => {
      //cannot find case
      if (err.status === 404) {
        console.info("File not found", err);
        return this.caseStatusService.queryCaseData('DummyVal')
      }
    })
    .then(
      ret=>(
        ret.subscribe( 
          val => {
            console.info("Succes pull", val)
            this.caseData = val
          })
        )
    )
 
    

    
  }

}
