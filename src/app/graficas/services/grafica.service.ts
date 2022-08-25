import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class GraficaService {

  names: string[] = [];
  pricesUsd: number[] = [];

  allCriptosName: string[] = []

  criptoDays: string[] = []
  criptoPrices: number[] = []

  compararFirstChart: number[] = []
  compararSecondChart: number[] = []
  compararThreeChart: number[] = []


  constructor(
    private http: HttpClient
  ) { }

  getAllCriptos() {
    return this.http.get('https://api.coincap.io/v2/assets?limit=40')
      .pipe(

        delay(1500),

        map(resp => {
          const data = Object.values(resp)



          data[0].forEach((element: any) => {
            if (this.names.length <= 10) {
              this.names.push(element.name);
              this.pricesUsd.push(+parseFloat(element.priceUsd).toFixed(10));
              if (+parseFloat(element.priceUsd).toFixed(10) > 1) {
                this.names.pop();
                this.pricesUsd.pop()
              }
            }
          });
          return ({ labels: this.names, data: this.pricesUsd })
        }
        ))




  }

  getAllNameCriptos(){

   return this.http.get('https://api.coincap.io/v2/assets')
    .pipe(
      map(resp => {
        const allData = Object.values(resp)[0]
        console.log(allData);
        allData.forEach((element: any) => {
          this.allCriptosName.push(element.id)
        });
        
        return  this.allCriptosName
      }
      )
    )
  }


  getHistoryByName(cripto: string) {

    return this.http.get(`https://api.coincap.io/v2/assets/${cripto}/history?interval=d1`)
      .pipe(
        

        delay(1500),
        map(resp => {
          this.criptoDays = [];
          this.criptoPrices = []

          const dataAll = Object.values(resp)[0] 
          const data = dataAll.slice(dataAll.length-62, dataAll.length)

          data.forEach((element: any) => {
            this.criptoPrices.push(+parseFloat(element.priceUsd).toFixed(4));
            this.criptoDays.push(element.date.slice(0,10))
          });

          return ({ labels: this.criptoDays, data: this.criptoPrices})
        }
        )
      )
  }

  getCriptoByName(cripto: string){
    return this.http.get(`https://api.coincap.io/v2/assets/${cripto}`)
    .pipe(

      map(resp => {


        const data = Object.values(resp)[0] 
    
          this.compararFirstChart = []
          this.compararSecondChart = []
          this.compararThreeChart = []

          const fisrtChart = [+parseFloat(data.maxSupply).toFixed(4), +parseFloat(data.marketCapUsd).toFixed(4), +parseFloat(data.volumeUsd24Hr).toFixed(4)]
          this.compararFirstChart.push(...fisrtChart)
          const secondChart = [+parseFloat(data.priceUsd).toFixed(4), +parseFloat(data.vwap24Hr).toFixed(4)]
          this.compararSecondChart.push(...secondChart)
          
       
        return ({first: this.compararFirstChart, second: this.compararSecondChart, three:  (+parseFloat(data.changePercent24Hr).toFixed(2)), name: data.id})
      
 
    
  }))
  }
}

