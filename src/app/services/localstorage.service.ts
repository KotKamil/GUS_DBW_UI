import {Injectable} from "@angular/core";
import {SectionModel} from "../models/section.model";
import {Language} from "../models/language.model";

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

    constructor() {
    }

    setItem(key: string, value: any) {
      localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key: string) {
      return JSON.parse(localStorage.getItem(key) || '');
    }

    /** This method is used to store the variable values from the DBW API's **variable-section-periods** endpoint
     * @param variableId: The variable id
     * @param sectionId: The section id
     * @param periodId: The period id
     * @param value: The value to be stored
     * @param lang: The language of the value
     * Params are used to create a unique key for the local storage to make searching easier*/
    setDBWVariableSectionPeriod(variableId: number, sectionId: number, periodId: number, value: any, lang: Language) {
      const key = `${variableId}-${sectionId}-${periodId}-${lang}`;
      this.setItem(key, value);
    }

    /** This method is used to find all sections and periods for given variable index,
     * saved in the local storage by the **LocalstorageService.setDBWVariableSectionPeriod** method
     * @param variableId: The variable id
     * @param language: The language of the values*/
    findSectionsAndPeriods(variableId: number, language: Language): SectionModel[] {
      const keys = Object.keys(localStorage);
      const foundKeys = keys.filter(key => key.startsWith(variableId+'-') && key.endsWith(language));
      return foundKeys.map(key => JSON.parse(localStorage.getItem(key) || '')); // return the values of the found keys
    }
}
