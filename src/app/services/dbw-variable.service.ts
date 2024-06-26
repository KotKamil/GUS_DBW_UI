import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Language} from "../models/language.model";
import {SectionModel} from "../models/section.model";
import {map, Observable} from "rxjs";
import {VariableSectionPostionModel} from "../models/variable-section-postion.model";
import {VariableValuesModel} from "../models/variable-values.model";
import {MetadataModel} from "../models/metadata.model";

@Injectable({providedIn: "root"})
export class DbwVariableService {
  private url: string = environment.apiDbwURL + 'variable/'

  constructor(public httpClient: HttpClient) {}

  /**Get the number of pages for the **variable-section-periods** endpoint
   * @param language - choose the language of the response
   * @param pageSize - determines how many records are given on each page (max 5000)*/
  GetVariableSectionPeriodsPageCount(language: Language, pageSize: number): Observable<number> {
    let params = new HttpParams().append('lang', language)
    params = params.append('ile-na-stronie', pageSize)
    params = params.append('numer-strony', '0')

    return this.httpClient
      .get<{"page-count": number}>(this.url + 'variable-section-periods', {params})
      .pipe(map(response => response['page-count']))
  }

  /**Get a list of variables with its section and periods
   * @param {Language} language - choose the language of the response
   * @param {number} pageSize - determines how many records are given on each page (max 5000)
   * @param {number} pageNumber - choose from which page you would like to get values*/
  GetVariableSectionPeriods(language: Language, pageSize: number, pageNumber: number) {
    let params = new HttpParams().append('lang', language)
    params = params.append('ile-na-stronie', pageSize)
    params = params.append('numer-strony', pageNumber)

    return this.httpClient
      .get<{data: SectionModel[]}>(this.url + 'variable-section-periods', {params})
      .pipe(map(response => response.data))
  }

  /**Get a list of values and position of these values for given section
   * @param {Language} language - choose the language of the response
   * @param {number} sectionId - select a section you want data from*/
  GetVariableSectionPosition(language: Language, sectionId: number) {
    let params = new HttpParams().append('lang', language)
    params = params.append('id-przekroj', sectionId)

    return this.httpClient
      .get<VariableSectionPostionModel[]>(this.url + 'variable-section-position', {params})
  }

  /**Get data for selected variable, in selected section, period and year
   * @param {Language} language - choose the language of the response
   * @param {number} variableId - select a variable
   * @param {number} sectionId - select a section
   * @param {number} year - select a year
   * @param {number} periodId - select a period
   * @param {number} pageSize - determines how many records are given on each page (max 5000)
   * @param {number} pageNumber - choose from which page you would like to get data*/
  GetVariableDataSection(language: Language, variableId: number, sectionId: number, year: number, periodId: number, pageSize: number, pageNumber: number) {
    let params = new HttpParams().append('lang', language)
    params = params.append('id-zmienna', variableId)
    params = params.append('id-przekroj', sectionId)
    params = params.append('id-rok', year)
    params = params.append('id-okres', periodId)
    params = params.append('ile-na-stronie', pageSize)
    params = params.append('numer-strony', pageNumber)

    return this.httpClient
      .get<{data: VariableValuesModel[]}>(this.url + 'variable-data-section', {params})
      .pipe(map(result => result.data))
  }

  /**Get full metadata package for selected variabble
   * @param {Language} language - choose the language of the response
   * @param {number} variableId - select a variable */
  GetVariableMeta(language: Language, variableId: number) {
    let params = new HttpParams().append('lang', language)
    params = params.append('id-zmiennej', variableId)

    return this.httpClient
      .get<MetadataModel>(this.url + 'variable-meta', {params})
  }
}
