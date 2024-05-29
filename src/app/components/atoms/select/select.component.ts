import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnChanges {
  isListHidden = true;
  @Input() options!: Array<string>;
  @Input() placeholder: string = '';
  @Output() selection: EventEmitter<string> = new EventEmitter<string>()
  displayedOptions:Array<string> = []
  selectedValue = ""

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && this.options === undefined) throw new Error("'options' are required in select component")
    this.displayedOptions = this.options;
  }

  onClick() {
    this.isListHidden = !this.isListHidden;
  }

  filterOptions (inputValue: string) {
    this.displayedOptions = this.options.filter(option => option.toLowerCase().startsWith(inputValue.toLowerCase()))
    this.selectedValue = inputValue
  }

  onOptionSelect(optionValue: string) {
    this.selectedValue = optionValue
    this.isListHidden = true
    this.selection.emit(this.selectedValue)
  }
}
