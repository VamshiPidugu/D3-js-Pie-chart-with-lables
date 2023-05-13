import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SankeyComponent } from './sankey.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { PiecharlineComponent } from './piecharline/piecharline.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    HelloComponent,
    SankeyComponent,
    PieChartComponent,
    PiecharlineComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
