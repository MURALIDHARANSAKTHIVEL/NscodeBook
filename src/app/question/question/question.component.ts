import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.less']
})
export class QuestionComponent implements OnInit {

  constructor() { }
  placeholder="Drop Question Or Type Question here";
  ngOnInit() {
  }
  editorstyle={

    'height':'300px',
    'overflow-y':'auto'
  
 

  }
}
