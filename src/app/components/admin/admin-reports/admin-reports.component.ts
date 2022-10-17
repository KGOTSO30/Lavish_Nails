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
    google.charts.setOnLoadCallback(this.drawSalesChart);
    google.charts.setOnLoadCallback(this.drawCancelChart);
  }

  drawSalesChart() {

    var data = google.visualization.arrayToDataTable([
      ['Element', 'Total Sales ', { role: 'style' }],
      ['Rubberbase', 1500.00, 'blue'],            // RGB value
      ['Acrylic', 1200.00, 'blue'],            // English color name
      ['Polygel', 900.00, 'blue'],
      ['Nail Art', 70, 'red'],            // English color name
      ['Extras', 0.00, 'red'],

    ['Gel pedi', 20.00, 'color: red' ], // CSS-style declaration
   ]);

   var options = {'title':'Total Sales of Each Category',
   'width':1000,
   'height':800};

   var chart = new google.visualization.ColumnChart(document.getElementById("divColumnChart"));
   chart.draw(data,options);
  }

  drawCancelChart() {

    var data = google.visualization.arrayToDataTable([
      ['Element', 'Total Sales ', { role: 'style' }],
      ['Completed Appointments', 17, 'blue'],            // RGB value
      ['Cancelled Appointments', 2, 'blue'],            // English color name
      ['No Shows', 1, 'blue'],
     
   ]);

   var options = {'title':'Booked in under 3 months',
   'width':800,
   'height':500};

   var chart = new google.visualization.PieChart(document.getElementById("divPieChart"));
   chart.draw(data,options);

   var data2 = google.visualization.arrayToDataTable([
    ['Element', 'Total Sales ', { role: 'style' }],
    ['Completed Appointments', 6, 'blue'],            // RGB value
    ['Cancelled Appointments', 12, 'blue'],            // English color name
    ['No Shows', 1, 'blue'],
   
 ]);

 var options2 = {'title':'Booked for over 3 months',
 'width':800,
 'height':500};

 var chart2 = new google.visualization.PieChart(document.getElementById("divPieChart2"));
 chart2.draw(data2,options2);
  }

  drawCancelChart2() {

    var data2 = google.visualization.arrayToDataTable([
      ['Element', 'Total Sales ', { role: 'style' }],
      ['Completed Appointments', 1500.00, 'blue'],            // RGB value
      ['Cancelled Appointments', 1200.00, 'blue'],            // English color name
      ['No Shows', 900.00, 'blue'],
     
   ]);

   var options2 = {'title':'Total Sales of Each Category',
   'width':800,
   'height':500};

   var chart2 = new google.visualization.PieChart(document.getElementById("divPieChart2"));
   chart2.draw(data2,options2);
  }
}
