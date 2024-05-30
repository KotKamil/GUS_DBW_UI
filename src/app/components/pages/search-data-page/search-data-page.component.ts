import {Component, OnInit} from '@angular/core';
import {DbwAreaService} from "../../../services/dbw-area.service";
import {AreaModel} from "../../../models/area.model";
import {Language} from "../../../models/language.model";
import {VariableAreaModel} from "../../../models/variable-area.model";
import {DbwVariableService} from "../../../services/dbw-variable.service";
import {LocalstorageService} from "../../../services/localstorage.service";
import {SectionModel} from "../../../models/section.model";
import {PeriodModel} from "../../../models/period.model";
import {DbwDictionariesService} from "../../../services/dbw-dictionaries.service";
import {VariableValuesModel} from "../../../models/variable-values.model";

@Component({
  selector: 'app-search-data-page',
  templateUrl: './search-data-page.component.html',
  styleUrls: ['./search-data-page.component.css']
})
export class SearchDataPageComponent implements OnInit {
  areas: AreaModel[] = []
  areaNames: string[] = []

  variables: VariableAreaModel[] = []
  variableNames: string[] = []

  sections: SectionModel[] = []
  sectionNames: string[] = []
  selectedSectionId: number = 0;
  periods: PeriodModel[] = []
  periodNames: string[] = []
  periodIds: number[] = []
  selectedPeriodId: number = 0;

  activeVariableId: number = 0;
  yearRange: number[] = []
  selectedYear: number = 0;

  variableValues: VariableValuesModel[] = []

  constructor(public dbwAreaService: DbwAreaService,
              public dbwVariableService: DbwVariableService,
              public dbwDictionariesService: DbwDictionariesService,
              public localstorageService: LocalstorageService) { }

  ngOnInit(): void {
    this.dbwAreaService
      .GetAreas(Language.pl)
      .subscribe(response => {
        this.areas = response;
        this.areaNames = response.filter(area => area["czy-zmienne"]).map(area => area.nazwa)
      })

    this.dbwVariableService.GetVariableSectionPeriods(Language.pl, 10, 1)
  }

  onSelectArea(areaName: string) {
    const selectedArea = this.areas.find(area => area.nazwa === areaName);
    if (selectedArea !== undefined) {
      this.dbwAreaService
        .GetAreaVariables(Language.pl, selectedArea.id)
        .subscribe(response => {
          this.variables = response
          this.variableNames = response.map(variable => variable["nazwa-zmienna"])
        })
    }
  }

  onSelectVariable(variableName: string) {
    const selectedVariable = this.variables.find(variable => variable["nazwa-zmienna"] === variableName);

    if (selectedVariable !== undefined) {
      this.activeVariableId = selectedVariable["id-zmienna"]
      this.sections = this.localstorageService.findSectionsAndPeriods(selectedVariable["id-zmienna"])
      this.sectionNames = this.sections
        .map(section => section["nazwa-przekroj"])

      this.sectionNames = this.sectionNames.filter((section, index) => this.sectionNames.indexOf(section) === index)

      this.periodIds = this.sections
        .filter(section => !this.periodIds.includes(section["id-okres"]))
        .map(section => section["id-okres"])
    }
  }

  onSelectSection(sectionName: string) {
    const selectedSection = this.sections.find(section => section["nazwa-przekroj"] === sectionName);
    if (selectedSection !== undefined) {
      this.selectedSectionId = selectedSection["id-przekroj"]
      let minPeriodId = 100000000
      let maxPeriodId = -100000000
      this.sections
        .filter(section => section["nazwa-przekroj"] === sectionName)
        .forEach(section => {
          if (section["id-okres"] < minPeriodId) {
            minPeriodId = section["id-okres"]
          }
          if (section["id-okres"] > maxPeriodId) {
            maxPeriodId = section["id-okres"]
          }
      });

      this.dbwDictionariesService
        .GetPeriodFromRange(Language.pl, minPeriodId, maxPeriodId)
        .subscribe(response => {
          this.periods = response.filter(period => this.periodIds.includes(period["id-okres"]))
          this.periodNames = this.periods.map(period => period["opis"])
        })

      this.dbwVariableService.GetVariableMeta(Language.pl, this.activeVariableId)
        .subscribe(response => {
          const sectionMeta = response["przekroje"].find(section => section["id-przekroj"] === selectedSection["id-przekroj"])
          if (sectionMeta !== undefined) {
            this.yearRange = sectionMeta["szereg-czasowy"].split("-").map(year => parseInt(year))
          }
        })
    }
  }

  onSelectPeriod(PeriodName: string) {
    const selectedPeriod = this.periods.find(period => period["opis"] === PeriodName)
    if (selectedPeriod !== undefined) {
      this.selectedPeriodId = selectedPeriod["id-okres"]
    }
  }

  onSelectYear(year: number) {
    this.selectedYear = year
  }

  onSubmit() {
    this.dbwVariableService
      .GetVariableDataSection(Language.pl, this.activeVariableId, this.selectedSectionId, this.selectedYear, this.selectedPeriodId, 5000, 0)
      .subscribe(response => this.variableValues = response)
  }
}
