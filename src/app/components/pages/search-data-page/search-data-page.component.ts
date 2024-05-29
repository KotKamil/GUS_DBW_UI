import {Component, OnInit} from '@angular/core';
import {DbwAreaService} from "../../../services/dbw-area.service";
import {Area110Model} from "../../../models/area-1-1-0.model";
import {Language} from "../../../models/language.model";
import {VariableAreaModel} from "../../../models/variable-area.model";
import {DbwVariableService} from "../../../services/dbw-variable.service";
import {LocalstorageService} from "../../../services/localstorage.service";
import {VariableSectionPeriodModel} from "../../../models/variable-section-period.model";
import {PeriodModel} from "../../../models/period.model";
import {DbwDictionariesService} from "../../../services/dbw-dictionaries.service";
import {VariableDataSectionModel} from "../../../models/variable-data-section.model";

@Component({
  selector: 'app-search-data-page',
  templateUrl: './search-data-page.component.html',
  styleUrls: ['./search-data-page.component.css']
})
export class SearchDataPageComponent implements OnInit {
  allAreas: Area110Model[] = []
  allAreaNames: string[] = []

  allAreaVariables: VariableAreaModel[] = []
  allAreaVariableNames: string[] = []

  variableSectionPeriods: VariableSectionPeriodModel[] = []
  variableSectionNames: string[] = []
  selectedSectionId: number = 0;
  allSectionPeriods: PeriodModel[] = []
  allSectionPeriodNames: string[] = []
  allVariablePeriodIds: number[] = []
  selectedPeriodId: number = 0;

  activeVariableId: number = 0;
  yearRange: number[] = []
  selectedYear: number = 0;

  variableValues: VariableDataSectionModel[] = []
  constructor(public dbwAreaService: DbwAreaService,
              public dbwVariableService: DbwVariableService,
              public dbwDictionariesService: DbwDictionariesService,
              public localstorageService: LocalstorageService) { }

  ngOnInit(): void {
    this.dbwAreaService
      .GetAreas(Language.pl)
      .subscribe(response => {
        this.allAreas = response;
        this.allAreaNames = response.filter(area => area["czy-zmienne"]).map(area => area.nazwa)
      })

    this.dbwVariableService.GetVariableSectionPeriods(Language.pl, 10, 1)
  }

  fetchVariablesFromArea(areaName: string) {
    const selectedArea = this.allAreas.find(area => area.nazwa === areaName);
    if (selectedArea !== undefined) {
      this.dbwAreaService
        .GetAreaVariables(Language.pl, selectedArea.id)
        .subscribe(response => {
          this.allAreaVariables = response
          this.allAreaVariableNames = response.map(variable => variable["nazwa-zmienna"])
        })
    }
  }

  fetchVariableData(variableName: string) {
    const selectedVariable = this.allAreaVariables.find(variable => variable["nazwa-zmienna"] === variableName);

    if (selectedVariable !== undefined) {
      this.activeVariableId = selectedVariable["id-zmienna"]
      this.variableSectionPeriods = this.localstorageService.findSectionsAndPeriods(selectedVariable["id-zmienna"])
      this.variableSectionNames = this.variableSectionPeriods
        .map(section => section["nazwa-przekroj"])

      this.variableSectionNames = this.variableSectionNames.filter((section, index) => this.variableSectionNames.indexOf(section) === index)

      this.allVariablePeriodIds = this.variableSectionPeriods
        .filter(section => !this.allVariablePeriodIds.includes(section["id-okres"]))
        .map(section => section["id-okres"])
    }
  }

  fetchPeriodsFromSection(sectionName: string) {
    const selectedSection = this.variableSectionPeriods.find(section => section["nazwa-przekroj"] === sectionName);
    if (selectedSection !== undefined) {
      this.selectedSectionId = selectedSection["id-przekroj"]
      let minPeriodId = 100000000
      let maxPeriodId = -100000000
      this.variableSectionPeriods
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
          this.allSectionPeriods = response.filter(period => this.allVariablePeriodIds.includes(period["id-okres"]))
          this.allSectionPeriodNames = this.allSectionPeriods.map(period => period["opis"])
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

  onSelectSection(PeriodName: string) {
    const selectedPeriod = this.allSectionPeriods.find(period => period["opis"] === PeriodName)
    if (selectedPeriod !== undefined) {
      this.selectedPeriodId = selectedPeriod["id-okres"]
    }
  }

  fetchVariableValues() {
    this.dbwVariableService
      .GetVariableDataSection(Language.pl, this.activeVariableId, this.selectedSectionId, this.selectedYear, this.selectedPeriodId, 5000, 0)
      .subscribe(response => this.variableValues = response)
  }
}
