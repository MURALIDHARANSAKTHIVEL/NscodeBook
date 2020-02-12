import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.less']
})
export class ProgressSpinnerComponent implements OnInit {

  @Input('spinnerLoader') loader: boolean;
  constructor() { }

  ngOnInit() {
  }
 
}
