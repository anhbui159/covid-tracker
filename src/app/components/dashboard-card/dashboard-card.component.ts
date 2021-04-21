import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css'],
})
export class DashboardCardComponent implements OnInit {
  @Input('totalConfirmed')
  totalConfirmed: number = 0;
  @Input('totalDeaths')
  totalDeaths: number = 0;
  @Input('totalActive')
  totalActive: number = 0;
  @Input('totalRecovered')
  totalRecovered: number = 0;
  constructor() {}

  ngOnInit(): void {}
}
