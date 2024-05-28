import {Component} from '@angular/core';
import {DbwAreaService} from "./services/dbw-area.service";
import {DbwDictionariesService} from "./services/dbw-dictionaries.service";
import {DbwVariableService} from "./services/dbw-variable.service";
import {Language} from "./models/language.model";
import {Area110Model} from "./models/area-1-1-0.model";
import {VariableAreaModel} from "./models/variable-area.model";
import {VariableSectionPeriodModel} from "./models/variable-section-period.model";
import {MetadataModel} from "./models/metadata.model";
import {VariableDataSectionModel} from "./models/variable-data-section.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ui';
  areas: Area110Model[] = []
  areaVariables: VariableAreaModel[] = []
  selectedVariable?: number;
  selectedArea?: number;
  variableSectionPeriods!: VariableSectionPeriodModel[];
  variableMeta?: MetadataModel;
  variableValues: VariableDataSectionModel[] = []
  variableSection?: number;
  year?: number;
  period?: number;


  constructor(public dbwAreaService: DbwAreaService,
              public dbwDictionariesService: DbwDictionariesService,
              public dbwVariableService: DbwVariableService) {}

  ngOnInit() {
    this.dbwAreaService.GetAreas(Language.pl).subscribe(response => this.areas = response);
    this.dbwVariableService.GetVariableSectionPeriods(Language.pl, 100, 0).subscribe(response => this.variableSectionPeriods = response)
  }

  fetchVariables() {
    if (this.selectedArea){
      this.dbwAreaService.GetAreaVariables(Language.pl, this.selectedArea).subscribe(response => this.areaVariables = response);
    }
  }

  fetchMeta() {
    if (this.selectedVariable) {
      this.dbwVariableService.GetVariableMeta(Language.pl, this.selectedVariable).subscribe(response => this.variableMeta = response);
    }
  }

  fetchData() {
    if (this.selectedVariable && this.variableSection && this.year && this.period)
      this.dbwVariableService.GetVariableDataSection(Language.pl, this.selectedVariable, this.variableSection, this.year, this.period, 100, 0)
        .subscribe(reponse => this.variableValues = reponse)
  }
}
