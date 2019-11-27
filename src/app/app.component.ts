import { LogoutComponent } from './shared/components/logout/logout.component';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private router: Router,
    private location: Location,
    private dialog: MatDialog
  ) {
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  environmentStatus = AppConfig.production
  

  whereAmI(){
    console.info(this.router.url)
  }

  goHome(){
    this.router.navigate([""])
  }

  goBack(){
    this.location.back()
  }

  goStatus() {
    this.router.navigate(['case-index'])

  }

  logOut(){

    if (localStorage.getItem('token')) {
      console.log("its present")
      let dialogRef = this.dialog.open(LogoutComponent,{
        width:'200px'
      })

      dialogRef.afterClosed().subscribe(result=> {
        if (result===true){
          this.router.navigate([""])
        }
      })
    }
  }

}
