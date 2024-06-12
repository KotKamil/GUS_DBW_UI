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
import {MetadataModel} from "../../../models/metadata.model";
import {PresentationMethodMeasure110Model} from "../../../models/presentation-method-measure-1-1-0.model";
import {VariableSectionPostionModel} from "../../../models/variable-section-postion.model";

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

  variableMeta?: MetadataModel;
  wayOfPresentationIds: number[] = []
  waysOfPresentation: PresentationMethodMeasure110Model[] = []
  variableSectionPositions: VariableSectionPostionModel[]  = []

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
      this.sections = this.sections.filter(section => section["nazwa-przekroj"] === sectionName)

      const minPeriodId = Math.min(...this.periodIds)
      const maxPeriodId = Math.max(...this.periodIds)


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

      this.dbwVariableService.GetVariableSectionPosition(Language.pl, this.selectedSectionId)
        .subscribe(response => {
          this.variableSectionPositions = response
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
      .subscribe(response => {
        this.variableValues = response
        const valueSet = new Set<number>();

        response.forEach(item => {
          if (item['id-sposob-prezentacji-miara'] !== undefined) {
            valueSet.add(item['id-sposob-prezentacji-miara']);
          }
        });

        this.wayOfPresentationIds = Array.from(valueSet);
        const minWOPId = Math.min(...this.wayOfPresentationIds);
        const maxWOPId = Math.max(...this.wayOfPresentationIds);
        this.dbwDictionariesService.GetWayOfPresentationFromRange(Language.pl, minWOPId, maxWOPId)
          .subscribe(response => {
            this.waysOfPresentation = response.filter(wop => this.wayOfPresentationIds.includes(wop["id-sposob-prezentacji-miara"]))
          })
      })
  }
}
