export class SimulatorParameters{ 

    public networth: number = 100000; 
    public stockAllocation: number = 50; 
    public years: number = 10 ; 

    public dt:number = 0.01;

    public stockMu: number= 0.542;
    public stockSigma: number = 0.964;
    public bondsMu: number = 0.100;
    public bondsSigma: number = 0.335; 

    public numberMC: number = 1000; 

    public yearlySaving:number = 0; 
    public inflation = 0; 


}