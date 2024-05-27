import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  isListHidden = true;
  @Input() options!: Array<string>;
  displayedOptions:Array<string> = []
  selectedValue = ""

  constructor() { }

  ngOnInit(): void {
    if (this.options === undefined) throw new Error("'options' are required in select component")
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
  }
}
