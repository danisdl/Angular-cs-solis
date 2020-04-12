import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { DataService } from 'src/app/services/data.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-sabor',
  templateUrl: './sabor.component.html',
  styleUrls: ['./sabor.component.css']
})
export class SaborComponent implements OnInit {
  sabor: string;
  Chicle: string;
  Melon: string;
  Oreo: string;
  public pieChartLabels: Label[] = [['Chicle'], ['Melon'], 'Oreo'];
  public pieChartData: number[] = [8, 10, 2];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.actualizarSabores();
  }
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  async actualizarSabores() {
    (await this.dataService.contar('http://localhost:3000/api/Chicle')).subscribe((resultado) => {
      localStorage.setItem('Chicle', resultado.toString());
    });
    (await this.dataService.contar('http://localhost:3000/api/Melon')).subscribe((resultado) => {
      localStorage.setItem('Melon', resultado.toString());
    });
    (await this.dataService.contar('http://localhost:3000/api/Oreo')).subscribe((resultado) => {
      localStorage.setItem('Oreo', resultado.toString());
    });
  }

  async actualizarS() {
    this.actualizarSabores();
    this.Oreo = localStorage.getItem('Oreo');
    this.Melon = localStorage.getItem('Melon');
    this.Chicle = localStorage.getItem('Chicle');

    await console.log(this.Chicle, this.Melon, this.Oreo);
    this.pieChartData = [ parseInt(this.Chicle), parseInt(this.Melon), parseInt(this.Oreo) ];
  }

}
