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
    data5.addColumn('string', 'Recommendation');
    data5.addRows([
      ['Bridget Oppenheimer',  10, true, 'Reward'],
      ['Jim Carrey',  9,  true, 'FeedBack'],
      ['Alice', 5, true, 'FeedBack'],
      ['Bob Builder',   13,  true, 'Reward'],
      ['Hellen May',   1,  false, 'FeedBack'],
      ['Mbali Naidoo', 7, true, 'FeedBack'],
      ['Eva Materazzi',   3,  false, 'FeedBack'],
      ['Mildred Moyo',   1,  false, 'FeedBack'],
      ['Uncle Phil', 2, false, 'FeedBack'],
    
      ['Hlumelo Dlamini',   8,  true, 'FeedBack']
    ]);

    var options = {showRowNumber: true, width: '100%', height: '100%'};

    var table = new google.visualization.Table(document.getElementById('table_div'));

    table.draw(data5, options);
  }
  
}
