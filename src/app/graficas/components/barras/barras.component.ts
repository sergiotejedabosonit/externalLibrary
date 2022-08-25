import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
 
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
 
import { GraficaService } from '../../services/grafica.service';

 

@Component({
  selector: 'app-barras',
  templateUrl: './barras.component.html' 
})
export class BarrasComponent implements OnInit {

 
  public date = new Date()

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min:0,
        max: 1.2
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [  ],
    datasets: [
      { data: [   ] , 
        backgroundColor: 
        [
          '#87F4FF',
           '#7ADB74',
           '#F2E58D',
           '#DB9E74',
           '#EA83FA'
        ],
      hoverBackgroundColor:[
        '#1ADCFF',
        '#36DE1D',
        '#F5CB28',
        '#DE4818',
        '#CC23FC'
      ]} 
    ],
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
 
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
     
  }

  constructor(
    private gs: GraficaService
  ) {
    
   }

  ngOnInit(): void {
    this.gs.getAllCriptos() 
    .subscribe( ({labels, data}) => {
      
      this.barChartData.labels = labels;
      this.barChartData.datasets[0].data = data
    })
    
       
      
 

   
  } 
  
}
