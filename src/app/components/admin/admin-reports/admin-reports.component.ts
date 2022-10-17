import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
  
  }

  drawChart() {

    var data = google.visualization.arrayToDataTable([
      ['Element', 'Density', { role: 'style' }],
      ['Copper', 8.94, '#b87333'],            // RGB value
      ['Silver', 10.49, 'silver'],            // English color name
      ['Gold', 19.30, 'gold'],

    ['Platinum', 21.45, 'color: #e5e4e2' ], // CSS-style declaration
   ]);
   var chart = new google.visualization.ColumnChart(document.getElementById("divColumnChart"));
   chart.draw(data,null);
  }
}
