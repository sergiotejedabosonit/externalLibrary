import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

import { GraficaService } from '../../services/grafica.service';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-comparador',
  templateUrl: './comparador.component.html' 
})
export class ComparadorComponent implements OnInit {
  
  miFormulario: FormGroup = this.fb.group({
    criptoOne: ['', [Validators.required]],
    criptoTwo: ['', [Validators.required]],
    criptoThree: [''],
  })
  
  allCriptos: string[] = []

  constructor(
    private gs: GraficaService,
    private fb: FormBuilder
  ) { }

  // RADAR CHART //

  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public radarChartLabels: string[] = [ 'maxSupply' , 'marketCapUsd', 'volumeUsd24Hr' ];

  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      { data: [   ], label: ' ' },
      { data: [  ], label: ' ' },
      { data: [  ], label: ' ' }
    ]
  };
  public radarChartType: ChartType = 'radar';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }


  // BARRAS
  
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
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
    labels: [ 'priceUsd', 'vwap24Hr'  ],
    datasets: [
      { data: [  ], label:  '' },
      { data: [  ], label: '' },
      { data: [  ], label: '' }
    ]
  };





  // POLAR
  public polarAreaChartLabels: string[] = [   ];
  public polarAreaChartData: ChartData<'polarArea'> = {
    labels: this.polarAreaChartLabels,
    datasets: [ {
      data: [  ],
      label: 'crecimiento' 
    } ]
  };
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

 



  ngOnInit(): void {
     
    this.gs.getAllNameCriptos().subscribe(resp => {
      this.allCriptos.push(...resp)
    })

  }


  buscar(firstCripto: string, secondCripto: string, thirdCripto: string){
     
    this.radarChartData.datasets = [
      { data: [   ], label: ' ' },
      { data: [  ], label: ' ' },
      { data: [  ], label: ' ' }
    ]
    this.barChartData.datasets = [
        { data: [  ], label:  '' },
        { data: [  ], label: '' },
        { data: [  ], label: '' }
      ]
    this.polarAreaChartLabels = []
    this.polarAreaChartData = {
      labels: this.polarAreaChartLabels,
      datasets: [ {
        data: [  ],
        label: ' '
      } ]
    }




    console.log(firstCripto, secondCripto, thirdCripto)
    this.gs.getCriptoByName(firstCripto).subscribe(
      ({first, name, second, three}) => {
        
          this.radarChartData.datasets[0].data.push(...first)
          this.radarChartData.datasets[0].label = name
          this.barChartData.datasets[0].data.push(...second)
          this.barChartData.datasets[0].label = name
          this.polarAreaChartData.datasets[0].data.push(three)
          this.polarAreaChartLabels.push(name)
      })
    this.gs.getCriptoByName(secondCripto).subscribe(
      ({first, name, second, three}) =>  {
        
        this.radarChartData.datasets[1].data.push(...first)
        this.radarChartData.datasets[1].label = name
        this.barChartData.datasets[1].data.push(...second)
        this.barChartData.datasets[1].label = name
        this.polarAreaChartData.datasets[0].data.push(three)
        this.polarAreaChartLabels.push(name)
      })
    this.gs.getCriptoByName(thirdCripto).subscribe(
    ({first, name, second, three}) => {
      console.log(this.radarChartData.datasets[2]);
      this.radarChartData.datasets[2].data.push(...first)
      this.radarChartData.datasets[2].label = name
      this.barChartData.datasets[2].data.push(...second)
      this.barChartData.datasets[2].label = name
      this.polarAreaChartData.datasets[0].data.push(three)
      this.polarAreaChartLabels.push(name)
    })
    
  }

}
