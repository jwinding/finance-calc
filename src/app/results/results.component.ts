import { Component, OnInit, Input, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { NormalDist } from './normaldist'; 
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { SimulatorService } from './simulator.service';
import { SimulatorParameters } from './simulator.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  
  private chart: am4charts.XYChart;
  private ndist: NormalDist; 
  private date: Date; 

  mean:number;
  std: number; 

  @Input('input') params: SimulatorParameters; 
  constructor(private zone: NgZone, public simulator: SimulatorService){
    
  }


  ngOnInit() {
    this.simulator.runSimulation(this.params);
  }

  ngAfterViewInit() {
  
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);
  
      chart.paddingRight = 20;

      let data = [];
      let years = this.params.years;
      let init_value = this.params.networth;
      let stock_all = this.params.stockAllocation/100.; 
      let dt = this.params.dt; 

      let date = this.simulator.date;
      
      
      for (let i = 1; i < (years/dt + 1 ); i++) {
        // visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        // r2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
        data.push({ date: new Date(date.getFullYear(), 0, date.getMonth()*30+ i*(365*dt)), name: "name" + i, 
          best: this.simulator.bestSeries[i],
          worst: this.simulator.worstSeries[i],
          mean: this.simulator.meanSeries[i] });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let best = chart.series.push(new am4charts.LineSeries());
      best.dataFields.dateX = "date";
      best.dataFields.valueY = "best";
      best.legendSettings.labelText="Best";
      best.stroke = am4core.color("blue");//("#CDA2AB");

      let worst = chart.series.push(new am4charts.LineSeries());
      worst.dataFields.dateX = "date";
      worst.dataFields.valueY = "worst";
      worst.legendSettings.labelText="Worst";
      worst.stroke = am4core.color("gray");

      let mean = chart.series.push(new am4charts.LineSeries());
      mean.dataFields.dateX = "date";
      mean.dataFields.valueY = "mean";
      mean.legendSettings.labelText="Average";
      mean.stroke = am4core.color("red");//("#CDA2AB");
      mean.strokeWidth = 3;

      chart.legend = new am4charts.Legend();
      chart.legend.position="top";
      
      mean.tooltipText = "{valueY.formatNumber('#,###,###.')}$";
      chart.cursor = new am4charts.XYCursor();

      dateAxis.tooltipDateFormat = "yyyy-MM";


      // let scrollbarX = new am4charts.XYChartScrollbar();
      // scrollbarX.series.push(best);
      // scrollbarX.series.push(worst);
      // scrollbarX.series.push(mean);
      // chart.scrollbarX = scrollbarX;
  
      this.chart = chart;
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
