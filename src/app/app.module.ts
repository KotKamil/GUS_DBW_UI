import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { SelectComponent } from './components/atoms/select/select.component';
import {FormsModule} from "@angular/forms";
import {ObjectTableComponent} from "./components/atoms/object-table/object-table.component";
import { TestPageComponent } from './components/pages/test-page/test-page.component';
import {AppRoutingModule} from "./app-routing.module";
import { SearchDataPageComponent } from './components/pages/search-data-page/search-data-page.component';
import { ApiQueryFormComponent } from './components/organisms/api-query-form/api-query-form.component';
import { DataPresentationComponent } from './components/organisms/data-presentation/data-presentation.component';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectComponent,
    ObjectTableComponent,
    TestPageComponent,
    SearchDataPageComponent,
    ApiQueryFormComponent,
    DataPresentationComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
