import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CurrencyPipe} from '@angular/common'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputPanelComponent } from './input-panel/input-panel.component';
import { ResultsComponent } from './results/results.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { InputAdvancedComponent } from './input-advanced/input-advanced.component';
import { SimulatorParameters } from './results/simulator.model';
import { NavbarComponent } from './navbar/navbar.component';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    InputPanelComponent,
    ResultsComponent,
    InputAdvancedComponent,
    NavbarComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [SimulatorParameters, CurrencyPipe],
  bootstrap: [AppComponent],
  entryComponents: [ResultsComponent,InfoComponent]
})
export class AppModule { }
