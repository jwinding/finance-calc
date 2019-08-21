import { Injectable } from '@angular/core';
import { ResultsComponent } from './results.component';
import { SimulatorParameters } from './simulator.model'; 
import { NormalDist } from './normaldist'; 


@Injectable({
  providedIn: 'root'
})

export class SimulatorService {

  private ndist: NormalDist; 

  private mc_stocks: any;
  private mc_bonds: any;

  public bestSeries: number[];
  public worstSeries: number[];
  public meanSeries: number[];

  public bestReturn:number;
  public worstReturn:number; 

  public networth:number;
  public years: number; 
  public mean: number;
  public std: number;
  public bankruptcy:number; 

  private savingInterval: number = 0.25; //insert savings 4 times/year. 


  public date: Date; 

  constructor( private params:SimulatorParameters ) { 
    this.ndist = new NormalDist();
  }

  private GeomBrownianMotion( mu: number, sigma:number, dt:number, timeLim: number,
                               yearlySaving:number, inflation:number):number[] {
    let sqrtdt = Math.sqrt(dt); 
    let n = timeLim/ dt; 
    let x: number[] = [1]; 

    let insertion = this.savingInterval * yearlySaving; 
    let infl_factor = (1+inflation)**(this.savingInterval);
    let savingCounter = 0;     

    for(let i=0; i<n ; i++){
      let saving = 0;
      savingCounter+=dt; 
      if(savingCounter>this.savingInterval){
        insertion *= infl_factor; 
        saving += insertion; 
        savingCounter=0;
      }
      let step = Math.exp((mu - sigma**2/2)*dt ) * Math.exp(sigma*this.ndist.normalRandomScaled(0, sqrtdt));
      x.push(step*x[x.length - 1] + saving); 
    }
    return x; 
  }


  private MCsimulation2(mus:number[], sigmas:number[], allocation:number[], 
    startNetworth:number,
     dt:number,timeLim:number, N:number, yearlySaving:number, inflation:number){
  
      let simResFull=[];
      for(let n =0; n<mus.length; n++){
        let partRes = [] ;
        let saving = yearlySaving/startNetworth; 
        for(let i = 0 ; i<N; i++){
          partRes.push(this.GeomBrownianMotion(mus[n],sigmas[n],dt,timeLim, saving, inflation) ) ; 
        }
        simResFull.push(partRes); 
      }

      let simRes = []; 
      for(let i=0; i<N; i++){
        let res = [];
        for(let j=0;j< simResFull[0][0].length;j++){
          let sum = 0;
          for( let n =0; n< allocation.length;n++ ){
            sum += startNetworth*allocation[n]* simResFull[n][i][j];            
          }
          res.push(sum);
        }
        simRes.push(res);
      }

      let meanSeries=[]
      for(let i = 0; i < simRes[0].length; i++){
        let sum = 0; 
        for(let j=0; j<N; j++){
          sum += simRes[j][i]; 
        }
        meanSeries.push(sum/N); 
      }

      simRes.sort((a, b) => a[a.length-1] - b[b.length-1]); //sorts the results, so that the best return is in the last spot. 

      let bankruptcy = 0; 
      let sqsum = 0;
      for(let i = 0; i<N; i++){
        sqsum += simRes[i][simRes[0].length-1]**2;
        if(this.checkBankruptcy(simRes[i])){
          bankruptcy++;
        }
      }
      let standardDev = Math.sqrt( (sqsum/N - meanSeries[meanSeries.length-1]**2)); 

      return { bestSeries: simRes[simRes.length-1] , worstSeries : simRes[0], meanSeries: meanSeries , 
      meanReturn: meanSeries[meanSeries.length-1], std: standardDev, bankruptcy:bankruptcy } ;
  }

  private checkBankruptcy(series:number[]):boolean {
    for(let i = 0;i<series.length; i++){
      if (series[i]<=0){ return true;}
    }
    return false;
  }


  public runSimulation( params: SimulatorParameters ) {

    this.params = params; 
    let stock_all = this.params.stockAllocation/100.; 
    this.date = new Date(); 
    
    let mus = [params.stockMu, params.bondsMu];
    let sigmas = [params.stockSigma, params.bondsSigma];
    let allocation=[stock_all, 1-stock_all];
    let inflation = params.inflation/1000; 

    let mc_results = this.MCsimulation2(mus, sigmas, allocation, params.networth,params.dt, params.years,
       params.numberMC, params.yearlySaving, inflation); 

    this.networth = params.networth; 
    this.years = params.years; 
    this.mean = mc_results.meanReturn;
    this.std = mc_results.std;
    this.meanSeries=mc_results.meanSeries;
    this.bestSeries=mc_results.bestSeries;
    this.worstSeries=mc_results.worstSeries;
    this.bankruptcy = mc_results.bankruptcy; 

    this.bestReturn = mc_results.bestSeries[mc_results.bestSeries.length-1]
    this.worstReturn = mc_results.worstSeries[mc_results.worstSeries.length-1]
  }


}
