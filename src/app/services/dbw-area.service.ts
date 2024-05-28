import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {Language} from "../models/language.model";
import {Area110Model} from "../models/area-1-1-0.model";
import {VariableAreaModel} from "../models/variable-area.model";

@Injectable({providedIn: "root"})
export class DbwAreaService {
  private url: string = environment.apiDbwURL + 'area/';

  constructor(public httpClient: HttpClient) {}

  //Get a list of all thematic areas from DBW
  GetAreas(language: Language) {
    return this.httpClient
      .get<Area110Model[]>(this.url + 'area-area', {params: {lang: language}})
  }

  //Get a list of variables from thematic area
  GetAreaVariables(language: Language, areaId: number) {
    return this.httpClient
      .get<VariableAreaModel[]>(this.url + 'area-variable', {params: {"id-obszaru": areaId, lang: language,}})
  }
}
