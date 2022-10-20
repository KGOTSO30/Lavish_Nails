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
    google.charts.load('current', {'packages':['table']});

    google.charts.setOnLoadCallback(this.drawSalesChart);
    google.charts.setOnLoadCallback(this.drawCancelChart);
    google.charts.setOnLoadCallback(this.drawReturnTable);
    
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

   var data3 = google.visualization.arrayToDataTable([
    ['Element', 'Total Sales ', { role: 'style' }],
    ['Rubberbase', 1500.00, 'blue'],            // RGB value
    ['Acrylic', 1200.00, 'blue'],            // English color name
    ['Polygel', 900.00, 'blue'],
    ['Nail Art', 70, 'red'],            // English color name
    ['Extras', 0.00, 'red'],

  ['Gel pedi', 20.00, 'color: red' ], // CSS-style declaration
 ]);

 var options3 = {'title':'Total Sales of Each Category',
 'width':1000,
 'height':800};

 var chart3 = new google.visualization.ColumnChart(document.getElementById("divColumnChart"));
 chart3.draw(data3,options3);
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

  drawReturnChart() {

    var data4 = new google.visualization.DataTable();
    data4.addColumn('number', 'Day');
    data4.addColumn('number', 'Guardians of the Galaxy');
    data4.addColumn('number', 'The Avengers');
    data4.addColumn('number', 'Transformers: Age of Extinction');

    data4.addRows([
      [1,  37.8, 80.8, 41.8],
      [2,  30.9, 69.5, 32.4],
      [3,  25.4,   57, 25.7],
      [4,  11.7, 18.8, 10.5],
      [5,  11.9, 17.6, 10.4],
      [6,   8.8, 13.6,  7.7],
      [7,   7.6, 12.3,  9.6],
      [8,  12.3, 29.2, 10.6],
      [9,  16.9, 42.9, 14.8],
      [10, 12.8, 30.9, 11.6],
      [11,  5.3,  7.9,  4.7],
      [12,  6.6,  8.4,  5.2],
      [13,  4.8,  6.3,  3.6],
      [14,  4.2,  6.2,  3.4]
    ]);

    var options = {
      chart: {
        title: 'Box Office Earnings in First Two Weeks of Opening',
        subtitle: 'in millions of dollars (USD)'
      },
      width: 900,
      height: 500
    };

    var chart4 = new google.charts.Line(document.getElementById('linechart_material'));

    chart4.draw(data4, google.charts.Line.convertOptions(options));
  }

  drawReturnTable() {
    var data5 = new google.visualization.DataTable();
    data5.addColumn('string', 'Customer Name');
    data5.addColumn('number', 'Number of Services Rendered For');
    data5.addColumn('boolean', 'Returning?');
    data5.addRows([
      ['Bridget Oppenheimer',  10, true],
      ['Jim Carrey',  9,  true],
      ['Alice', 5, true],
      ['Bob Builder',   13,  true],
      ['Hellen May',   1,  false],
      ['Mbali Naidoo', 7, true],
      ['Eva Materazzi',   3,  true],
      ['Mildred Moyo',   1,  false],
      ['Uncle Phil', 2, true],
    
      ['Hlumelo Dlamini',   8,  true]
    ]);

    var options = {showRowNumber: true, width: '100%', height: '100%'};

    var table = new google.visualization.Table(document.getElementById('table_div'));

    table.draw(data5, options);
  }

}
