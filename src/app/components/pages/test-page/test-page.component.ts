import { Component, OnInit } from '@angular/core';
import {AreaModel} from "../../../models/area.model";
import {VariableAreaModel} from "../../../models/variable-area.model";
import {SectionModel} from "../../../models/section.model";
import {MetadataModel} from "../../../models/metadata.model";
import {VariableValuesModel} from "../../../models/variable-values.model";
import {DbwAreaService} from "../../../services/dbw-area.service";
import {DbwDictionariesService} from "../../../services/dbw-dictionaries.service";
import {DbwVariableService} from "../../../services/dbw-variable.service";
import {Language} from "../../../models/language.model";

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {
  title = 'ui';
  areas: AreaModel[] = []
  areaVariables: VariableAreaModel[] = []
  selectedVariable?: number;
  selectedArea?: number;
  variableSectionPeriods!: SectionModel[];
  variableMeta?: MetadataModel;
  variableValues: VariableValuesModel[] = []
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
