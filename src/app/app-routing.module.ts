import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputPanelComponent } from './input-panel/input-panel.component';
import { InputAdvancedComponent } from './input-advanced/input-advanced.component';
import { InfoComponent } from './info/info.component'; 


const routes: Routes = [
  { path: 'basic', component: InputPanelComponent},
  { path: '', redirectTo:'/basic',  pathMatch:'full' },
  { path: 'advanced', component: InputAdvancedComponent},
  { path: 'about', component: InfoComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
