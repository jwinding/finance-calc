import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputPanelComponent } from './input-panel/input-panel.component';
import { InputAdvancedComponent } from './input-advanced/input-advanced.component';



const routes: Routes = [
  { path: '', component: InputPanelComponent},
  { path: 'advanced', component: InputAdvancedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
