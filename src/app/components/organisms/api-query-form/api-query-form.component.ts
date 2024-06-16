import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Language} from "../../../models/language.model";

@Component({
  selector: 'app-api-query-form',
  templateUrl: './api-query-form.component.html',
  styleUrls: ['./api-query-form.component.css']
})
export class ApiQueryFormComponent implements OnInit {
  @Output() areaSelected = new EventEmitter<string>();
  @Output() variableSelected = new EventEmitter<string>();
  @Output() sectionSelected = new EventEmitter<string>();
  @Output() periodSelected = new EventEmitter<string>();
  @Output() yearSelected = new EventEmitter<number>();
  @Output() querySubmitted = new EventEmitter<void>();
  @Output() languageSelected:EventEmitter<any> = new EventEmitter<any>();

  @Input() selectedLanguage!: Language;
  @Input() areaNames: string[] = [];
  @Input() variableNames: string[] = [];
  @Input() sectionNames: string[] = [];
  @Input() periodNames: string[] = [];
  @Input() yearRange: number[] = [];

  selectedYear?: number;
  languages = ["pl", "en"];

  constructor() { }

  ngOnInit(): void {
  }

  selectLanguage($event: any) {
    this.languageSelected.emit($event.target.value);
  }

  selectArea($event: string) {
    this.areaSelected.emit($event);
  }

  selectVariable($event: string) {
    this.variableSelected.emit($event);
  }

  selectSection($event: string) {
    this.sectionSelected.emit($event);
  }

  selectPeriod($event: string) {
    this.periodSelected.emit($event);
  }

  selectYear($event: string) {
    this.yearSelected.emit(parseInt($event));
  }

  submitQuery() {
    this.querySubmitted.emit();
  }
}
