import { Component, OnInit } from '@angular/core';

declare var google: any;


@Component({
  selector: 'app-admin-tab',
  templateUrl: './admin-tab.component.html',
  styleUrls: ['./admin-tab.component.css']
})
export class AdminTabComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    google.charts.load('current', {'packages':['table']});
    google.charts.setOnLoadCallback(this.drawReturnTable);
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
