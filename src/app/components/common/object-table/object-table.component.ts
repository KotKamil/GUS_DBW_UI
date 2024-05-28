import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-object-table',
  templateUrl: './object-table.component.html',
  styleUrls: ['./object-table.component.css']
})
export class ObjectTableComponent implements OnChanges {
  @Input() objects!: Array<{ [key: string]: any }>
  keys: Array<string> = []
  isDataHidden = true

  constructor() {
  }

  ngOnChanges(changes:SimpleChanges): void {
    if (changes['objects'] && this.objects.length > 0)
      this.keys = Object.keys(this.objects[0])
    console.log(this.keys)
  }

  hideData() {
    this.isDataHidden = !this.isDataHidden;
  }
}
