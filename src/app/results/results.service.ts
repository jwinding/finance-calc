import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  ComponentRef,
} from '@angular/core'
import { ResultsComponent } from './results.component';
import {SimulatorParameters} from './simulator.model'; 
import { InfoComponent } from '../info/info.component';


@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  private resultsShowing: boolean = false; 
  private infoShowing: boolean = false; 

  resultComponent: ComponentRef<ResultsComponent>; 
  infoComponent: ComponentRef<InfoComponent>;

  private addResultComponent(){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ResultsComponent);
    const componentRef = componentFactory.create(this.injector);  
    
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.getElementById("resultsContainer").appendChild(domElem);

    this.resultComponent = componentRef;

  }

    
  private addInfoComponent(){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(InfoComponent);
    const componentRef = componentFactory.create(this.injector);  
    
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.getElementById("resultsContainer").appendChild(domElem);

    this.infoComponent = componentRef;

  }

  private removeResultsComponent() {
    this.appRef.detachView(this.resultComponent.hostView);
    this.resultComponent.destroy();
  }

  private removeInfoComponent() {
    this.appRef.detachView(this.infoComponent.hostView);
    this.infoComponent.destroy();
  }

  public showInfo(){
    if(this.resultsShowing){
      this.hideResults();
    }
    if(!this.infoShowing){
      this.addInfoComponent(); 
      this.infoShowing = true;
    } 
  }

  public showResults(params: SimulatorParameters){
    if(this.infoShowing){
      this.hideInfo(); 
    }
    this.addResultComponent(); 
    this.resultComponent.instance.params=params; 
    this.resultsShowing = true; 
  }

  public hideResults(){
    this.removeResultsComponent(); 
    this.resultsShowing=false;
  }

  public hideInfo(){
    this.removeInfoComponent(); 
    this.infoShowing=false; 
  }

  public resultsVisible(){
    return this.resultsShowing; 
  }

  public infoVisible(){
    return this.infoShowing;
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector) { }
}
