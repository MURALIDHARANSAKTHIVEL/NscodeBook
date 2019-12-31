import { Component, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  show: boolean = false;
  @Output() togglesildebar = new EventEmitter<boolean>();
  ngOnInit() {
  }
  activetoggle() {
    this.show = !this.show;
    this.togglesildebar.emit(this.show);
  }
}
