import {Component} from '@angular/core';
import {LocalstorageService} from "./services/localstorage.service";
import {DbwVariableService} from "./services/dbw-variable.service";
import {Language} from "./models/language.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public localstorageService: LocalstorageService,
              public dbwVariableService: DbwVariableService) {}

  ngOnInit(): void {
    /**This is a bad way of doing this, but DBW API doesn't have filter option on this endpoint.
     * App fetches a data from API and loads it into localstorage to make searching for specific values possible */
    const pageSize = 3000;
    this.dbwVariableService.GetVariableSectionPeriodsPageCount(Language.pl, pageSize).subscribe(pageCount => {
      for (let i = 0; i < pageCount; i++) {
        this.dbwVariableService.GetVariableSectionPeriods(Language.pl, pageSize, i).subscribe(variables => {
          variables.forEach(variable => {
            this.localstorageService.setDBWVariableSectionPeriod(variable['id-zmienna'], variable['id-przekroj'], variable['id-okres'], variable);
          });
        });
      }
    });
  }
}
