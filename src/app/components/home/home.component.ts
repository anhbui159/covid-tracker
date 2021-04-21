import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from './../../models/global-data';
import { GoogleChartInterface } from 'ng2-google-charts';
import { Ng2GoogleChartsModule, GoogleChartsSettings } from 'ng2-google-charts';

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
  globalData: GlobalDataSummary[] = [];
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
  };
  constructor(private dataService: DataServiceService) {}

  initChart() {
    let datatable: any = [];
    datatable.push(['Country', 'Cases']);
    console.log(this.globalData);
    this.globalData.forEach((cs) => {
      datatable.push([cs.country, cs.confirmed]);
    });
    console.log(datatable);
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      //firstRowIsData: true,
      // options: { title: 'Tasks' },
    };
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
        this.initChart();
      },
    });
  }
}
