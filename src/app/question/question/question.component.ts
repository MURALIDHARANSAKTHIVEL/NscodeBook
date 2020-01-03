import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.less']
})
export class QuestionComponent implements OnInit {
  TemplateType = new FormControl();
  isFirsttemplate: boolean = false;
  isSecondTemplate: boolean = false;
  active;
  Options: object = [1, 2, 3, 4];
  constructor() { }
  placeholder = "Type Question here Or Drop Question";
  ngOnInit() {
    this.TemplateType.valueChanges.subscribe(x => {

      this.isFirsttemplate = false;
      this.isSecondTemplate = false;
    });
  }
  editorstyle = {

    'height': '300px',
    'overflow-y': 'auto'
  }

  Templatecontrol(event) {
    if (this.isFirsttemplate) {
      this.isFirsttemplate = false;
    }
    else if (this.TemplateType.value == '2') {

      this.isSecondTemplate = true;
    }
    else if(this.TemplateType.value == '1')  {
      this.isFirsttemplate = true;
    }
    else
    {
      this.isFirsttemplate = false;
      this.isSecondTemplate = false;
    }
    // console.log(event.target.value)
    // this.active=event.target.value;




  }
}
