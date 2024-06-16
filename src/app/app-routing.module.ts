import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SearchDataPageComponent} from "./components/pages/search-data-page/search-data-page.component";
import {LandingPageComponent} from "./components/pages/landing-page/landing-page.component";


const routes: Routes = [
  {path: "", component: LandingPageComponent},
  {path: "search", component: SearchDataPageComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
