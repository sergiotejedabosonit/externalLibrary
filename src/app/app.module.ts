import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { BarrasComponent } from './graficas/components/barras/barras.component';
import { LineComponent } from './graficas/components/line/line.component';

import { NgChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { ComparadorComponent } from './graficas/components/comparador/comparador.component';
 
 
 
@NgModule({
  declarations: [
    AppComponent,
    BarrasComponent,
    LineComponent,
    ComparadorComponent
  
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
