import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  check = new FormControl()
  showslide:boolean;
  toggle(event:boolean)
  {
   
this.showslide=event;
  }
}
