import { Component, OnInit } from '@angular/core';
import { NumberSymbol } from '@angular/common';
import { ResultsService } from '../results/results.service'
import { SimulatorService } from '../results/simulator.service';
import { SimulatorParameters } from '../results/simulator.model';
import { math } from '@amcharts/amcharts4/core';



@Component({
  selector: 'app-input-advanced',
  templateUrl: './input-advanced.component.html',
  styleUrls: ['./input-advanced.component.css']
})
export class InputAdvancedComponent implements OnInit {


  params: SimulatorParameters; 
  private stockReturn:number;
  private bondReturn:number; 
  public effReturn:number; 

  public stockRet: number;
  public bondRet:number; 



  constructor(private results: ResultsService) { 

  }

  ngOnInit() {    
    this.params = new SimulatorParameters(); 
    this.params.stockMu *= 1000;
    this.params.stockSigma *=1000;
    this.params.bondsMu *= 1000;
    this.params.bondsSigma *= 1000; 

    this.stockRet=80;
    this.bondRet=45; 


    this.computeDrifts(); 
  }

  private computeDrifts(){
    let sSigma = this.params.stockSigma/1000;
    let bSigma = this.params.bondsSigma/1000;

    this.effReturn = this.params.stockAllocation/100 * this.stockRet/10 + (1- this.params.stockAllocation/100)*this.bondRet/10 ; 


    let sMu = 0.5*sSigma**2 + Math.log(1 + this.stockRet/1000); 
    let bMu = 0.5*bSigma**2 + Math.log(1 + this.bondRet/1000); 

    this.params.bondsMu=bMu;
    this.params.stockMu=sMu; 
  }




  
  run(){ //run simulation and show results below. 

    if(this.results.resultsVisible()) {
      this.results.hideResults(); 
    }
    this.computeDrifts(); 

    //need to copy the values because the async. binding messes things up otherwise. 
    let paramCopy = Object.assign({},this.params); 
    
    paramCopy.bondsSigma /=1000.;
    paramCopy.stockSigma/=1000.; 

    this.results.showResults(paramCopy); 

  }

}
