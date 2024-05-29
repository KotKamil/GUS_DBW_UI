import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TestPageComponent} from "./components/pages/test-page/test-page.component";
import {SearchDataPageComponent} from "./components/pages/search-data-page/search-data-page.component";


const routes: Routes = [
  {path: "test", component: TestPageComponent},
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
