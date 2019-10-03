import { Component, OnInit } from '@angular/core';
import { NumberSymbol } from '@angular/common';
import { ResultsService } from '../results/results.service'
import { SimulatorService } from '../results/simulator.service';
import { SimulatorParameters } from '../results/simulator.model';

@Component({
  selector: 'app-input-panel',
  templateUrl: './input-panel.component.html',
  styleUrls: ['./input-panel.component.css']
})
export class InputPanelComponent implements OnInit {

  params: SimulatorParameters; 
  public effReturn:number; 

  constructor(private results: ResultsService) { 
    // this.results.showResults();
  }

  public computeReturn(){
    let sSigma = this.params.stockSigma;
    let bSigma = this.params.bondsSigma;
    let sMu = this.params.stockMu;
    let bMu = this.params.bondsMu;

    let stockRet = (Math.exp(sMu-sSigma**2/2)-1)*100;
    let bondRet = (Math.exp(bMu-bSigma**2/2)-1)*100;

    this.effReturn = this.params.stockAllocation/100 * stockRet + (1- this.params.stockAllocation/100)*bondRet; 

  }

  ngOnInit() {
    this.params=new SimulatorParameters();  
    this.computeReturn();
  }

  
  run(){ 
    //run simulation and show results below. 

    if(this.results.resultsVisible()) {
      this.results.hideResults(); 
    }
    this.results.showResults(this.params); 
  }

}
