import {NoteModel} from "./note.model";

export interface MethodologicalExplanationsModel {
  "wyjasnienia-metodologiczne-tresc": string;
  "notki": NoteModel[]; // You need to provide the correct type for notes
}
