import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Language} from "../models/language.model";
import {map} from "rxjs";
import {PeriodModel} from "../models/period.model";
import {PresentationMethodMeasure110Model} from "../models/presentation-method-measure-1-1-0.model";
import {NoValueModel} from "../models/no-value.model";
import {SecrecyModel} from "../models/secrecy.model";
import {FlagModel} from "../models/flag.model";

@Injectable({providedIn: "root"})
export class DbwDictionariesService {
  private url: string = environment.apiDbwURL + 'dictionaries/'

  constructor(public httpClient: HttpClient) {}

  //Get a list of values from "dates" dictionary
  GetDateDictionary(language: Language) {
    return this.httpClient
      .get(this.url + 'date-dictionary', {params: {lang: language}})
  }

   /** Get a list of values from "periods" dictionary
    * @param {number} periodId - enter the id to get a specific value
    * @param {Language} language - choose the language of the response*/
  GetPeriodsDictionary(language: Language, periodId?: number) {
      let params = new HttpParams().append('lang', language);
      params = params.append('page-size', 5000)

      if (periodId) {
        params = params.append('filters', 'id-okres==' + periodId);
      }

      return this.httpClient
        .get<{data: PeriodModel[]}>(this.url + 'periods-dictionary', {params})
        .pipe(map(response => response.data));
  }

  /** Get a list of values from "periods" dictionary within a specific range to reduce the number of requests
   * @param language - choose the language of the response
   * @param minIndex - minimum searched index
   * @param maxIndex - maximum searched index*/
  GetPeriodFromRange(language: Language, minIndex: number, maxIndex: number) {
    let params = new HttpParams().append('lang', language);
    params = params.append('filters', 'id-okres>=' + minIndex + ',id-okres<=' + maxIndex);
    params = params.append('page-size', 5000)

    return this.httpClient
      .get<{data: PeriodModel[]}>(this.url + 'periods-dictionary', {params})
      .pipe(map(response => response.data));
  }

  /** Get a list of values from "way of presentation" dictionary
   * @param {number} presentationMethodId - enter the id to get a specific value
   * @param {Language} language - choose the language of the response*/
  GetWayOfPresentation(language: Language, presentationMethodId?: number) {
    let params = new HttpParams().append('lang', language);
    params = params.append('page-size', 5000)

    if (presentationMethodId) {
      params = params.append('filters', 'id-sposob-prezentacji-miara==' + presentationMethodId);
    }

    return this.httpClient
      .get<{data: PresentationMethodMeasure110Model[]}>(this.url + 'way-of-presentation', {params})
      .pipe(map(response => response.data));
  }

  /** Get a list of values from "way-of-presentation" dictionary within a specific range to reduce the number of requests
   * @param language - choose the language of the response
   * @param minIndex - minimum searched index
   * @param maxIndex - maximum searched index*/
  GetWayOfPresentationFromRange(language: Language, minIndex: number, maxIndex: number) {
    let params = new HttpParams().append('lang', language);
    params = params.append('filters', 'id-sposob-prezentacji-miara>=' + minIndex + ',id-sposob-prezentacji-miara<=' + maxIndex);
    params = params.append('page-size', 5000)

    return this.httpClient
      .get<{data: PresentationMethodMeasure110Model[]}>(this.url + 'way-of-presentation', {params})
      .pipe(map(response => response.data));
  }

  /** Get a list of values from "no value" dictionary
   * @param {number} noValueId - enter the id to get a specific value
   * @param {Language} language - choose the language of the response*/
  GetNoValueDictionary(language: Language, noValueId?: number) {
    let params = new HttpParams().append('lang', language);
    params = params.append('page-size', 5000)

    if (noValueId) {
      params = params.append('filters', 'id-brak-wartosci==' + noValueId);
    }

    return this.httpClient
      .get<{data: NoValueModel[]}>(this.url + 'no-value-dictionary', {params})
      .pipe(map(response => response.data));
  }

  /** Get a list of values from "secrecy" dictionary
   * @param {number} secrecyId - enter the id to get a specific value
   * @param {Language} language - choose the language of the response*/
  GetConfidentialityDictionary(language: Language, secrecyId?: number) {
    let params = new HttpParams().append('lang', language);
    params = params.append('page-size', 5000)

    if (secrecyId) {
      params = params.append('filters', 'id-tajnosci==' + secrecyId);
    }

    return this.httpClient
      .get<{data: SecrecyModel[]}>(this.url + 'confidentionality-dictionary', {params})
      .pipe(map(response => response.data));
  }

  /** Get a list of values from "flag" dictionary
   * @param {number} flagId - enter the id to get a specific value
   * @param {Language} language - choose the language of the response*/
  GetFlagDictionary(language: Language, flagId?: number) {
    let params = new HttpParams().append('lang', language);
    params = params.append('page-size', 5000)

    if (flagId) {
      params = params.append('filters', 'id-flaga==' + flagId);
    }

    return this.httpClient
      .get<{data: FlagModel[]}>(this.url + 'flag-dictionary', {params})
      .pipe(map(response => response.data));
  }
}
