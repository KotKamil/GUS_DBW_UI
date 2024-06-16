import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {VariableValuesModel} from "../../../models/variable-values.model";
import {MetadataModel} from "../../../models/metadata.model";
import {VariableSectionPostionModel} from "../../../models/variable-section-postion.model";
import {PresentationMethodMeasure110Model} from "../../../models/presentation-method-measure-1-1-0.model";
import {Language} from "../../../models/language.model";

@Component({
  selector: 'app-data-presentation',
  templateUrl: './data-presentation.component.html',
  styleUrls: ['./data-presentation.component.css']
})
export class DataPresentationComponent implements OnChanges {
  @Input() language!: Language;
  @Input() variableValues: VariableValuesModel[] = [];
  @Input() variableMeta: MetadataModel | undefined;
  @Input() sectionPositions: VariableSectionPostionModel[] = [];
  @Input() waysOfPresentation: PresentationMethodMeasure110Model[] = [];

  objectTableData: object[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.createObjectTableData();
  }

  createObjectTableData() {
    if (this.variableValues.length > 0 && this.sectionPositions.length > 0) {
      this.objectTableData = this.variableValues.map((variableValue: VariableValuesModel) => {
        let rowObject: object = {};

        for (const key of Object.keys(variableValue)) {
          if (key.startsWith('id-wymiar-') && variableValue.hasOwnProperty(key)) {
            const searchedDimension = this.sectionPositions
              .find((sectionPosition: VariableSectionPostionModel) =>
                sectionPosition['id-wymiar'] == variableValue[key as keyof VariableValuesModel]);

            const dimension: string = key.split('-')[2];
            const index = `id-pozycja-${dimension}`;

            const searchedPosition = this.sectionPositions
              .find((sectionPosition: VariableSectionPostionModel) =>
              sectionPosition['id-pozycja'] === variableValue[index as keyof VariableValuesModel]);

            if (searchedDimension && searchedPosition) {
              rowObject = {
                ...rowObject,
                [searchedDimension['nazwa-wymiar']]: searchedPosition['nazwa-pozycja'],
              }
            }
          }
        };

        const wayOfPresentationId = variableValue['id-sposob-prezentacji-miara'];

        rowObject = {
          ...rowObject,
          [this.language === Language.pl ? 'wartość' : 'value']: variableValue['wartosc'],
          [this.language === Language.pl ? 'miara' : 'measure']: this.waysOfPresentation.find((wayOfPresentation: PresentationMethodMeasure110Model) => wayOfPresentation["id-sposob-prezentacji-miara"] === wayOfPresentationId)?.["nazwa"] || 'Brak',
        }

        return rowObject;
      });
    }
  }

}
