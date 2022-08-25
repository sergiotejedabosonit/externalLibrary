import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
 
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';

import {default as Annotation} from 'chartjs-plugin-annotation';
import { GraficaService } from '../../services/grafica.service';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html' 
})
export class LineComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    cripto: [''],
  })
  
  cargandoCripto: boolean = false;

  allCriptos: string[] = []

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [   ],
        label: '',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      
    ],
    labels: [   ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },

    plugins: {
      legend: { display: false },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              position: 'center',
              
              color: 'orange',
              content: 'LineAnno',
              font: {
                weight: 'bold'
              }
            }
          },
        ],
      }
    }
  };

  public lineChartType: ChartType = 'line';

   

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }
 

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  constructor(
    private gs: GraficaService,
    private fb: FormBuilder
  ) {  Chart.register(Annotation) }

  ngOnInit(): void {

    
    this.gs.getAllNameCriptos().subscribe(resp => {
      this.allCriptos.push(...resp)
    })
     

   
 
  }
   buscar(){
    this.cargandoCripto = true;

    this.lineChartData.labels = []
    this.lineChartData.datasets[0].data = []

    this.gs.getHistoryByName(this.miFormulario.value.cripto).subscribe( ({labels, data}) => {
     
      console.log(labels);
      console.log(data);
      
      

      this.lineChartData.labels?.push(...labels),
      this.lineChartData.datasets[0].data.push(...data)
      this.lineChartData.datasets[0].label = this.miFormulario.value.cripto
 
    })
      console.log(this.miFormulario.value.cripto)
    }
}
