import { Component, OnInit, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-table-data-not-found',
  templateUrl: './table-data-not-found.component.html',
  styleUrls: ['./table-data-not-found.component.less']
})
export class TableDataNotFoundComponent implements OnInit {


  @Input('TableDataNotFound') tableDataNotFound: boolean=true;
  constructor() { }

  ngOnInit() {
  }

}
