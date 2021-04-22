import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from './../../models/global-data';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  datatable: any = [];
  globalData: GlobalDataSummary[] = [];
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
  };

  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
  };
  pChart = this.pieChart.component;
  cChart = this.columnChart.component;
  constructor(private dataService: DataServiceService) {}

  initChart(caseType: string) {
    this.datatable = [];
    this.datatable.push(['Country', 'Cases']);
    // console.log(this.globalData);
    // console.log(caseType);
    this.globalData.forEach((cs) => {
      let value: number = 0;
      if (caseType == 'c') {
        value = cs.confirmed;
      } else if (caseType == 'a') {
        value = cs.active;
      } else if (caseType == 'd') {
        value = cs.deaths;
      } else if (caseType == 'r') {
        value = cs.recovered;
      }
      this.datatable.push([cs.country, value]);
    });
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: this.datatable,
      //firstRowIsData: true,
      options: { height: 500 },
    };
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: this.datatable,
      //firstRowIsData: true,
      options: { height: 500 },
    };
    console.log(caseType);
    this.cChart?.draw();
    this.pChart?.draw();
  }
  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next: (result) => {
        // console.log(result);
        this.globalData = result;
        this.globalData.forEach((cs: GlobalDataSummary) => {
          if (!Number.isNaN(cs.confirmed)) {
            this.totalActive += cs.active;
            this.totalConfirmed += cs.confirmed;
            this.totalDeaths += cs.deaths;
            this.totalRecovered += cs.recovered;
          }
        });
        this.initChart('c');
      },
    });
  }

  updateChart(input: HTMLInputElement) {
    this.initChart(input.value);
  }
}
