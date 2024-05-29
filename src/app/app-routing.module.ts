import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TestPageComponent} from "./components/pages/test-page/test-page.component";


const routes: Routes = [
  {path: "test", component: TestPageComponent}
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
