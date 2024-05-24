import {FrequencyModel} from "./frequency.model";
import {TestsModel} from "./tests.model";
import {LegalActsModel} from "./legal-acts.model";
import {UnitModel} from "./unit.model";
import {NoteModel} from "./note.model";
import {ConceptModel} from "./concept.model";
import {CrossSectionModel} from "./cross-section.model";
import {TagModel} from "./tag.model";
import {MethodologicalExplanationsModel} from "./methodological-explanations.model";
import {DatasetModel} from "./dataset.model";

export interface MetadataModel {
  "id-zmienna": number;
  "nazwa": string;
  "nazwa-skrocona": string;
  "tagi": TagModel[];
  "pojecia": ConceptModel[];
  "wyjasnienia-metodologiczne": MethodologicalExplanationsModel;
  "notki": NoteModel[];
  "przekroje": CrossSectionModel[];
  "czestotliwosci": FrequencyModel[];
  "zestawy": DatasetModel[];
  "badania": TestsModel[];
  "akty-prawne": LegalActsModel[];
  "jednostki": UnitModel[];
}
