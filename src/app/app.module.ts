import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { SelectComponent } from './components/common/select/select.component';
import {FormsModule} from "@angular/forms";
import {ObjectTableComponent} from "./components/common/object-table/object-table.component";

@NgModule({
  declarations: [
    AppComponent,
    SelectComponent,
    ObjectTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
