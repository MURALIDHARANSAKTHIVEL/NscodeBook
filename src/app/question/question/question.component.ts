import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.less']
})
export class QuestionComponent implements OnInit {
  TemplateType = new FormControl();
  isTemplatechange: boolean = true;
  isFirsttemplate: boolean = false;
  isSecondTemplate: boolean = false;
  question:any;
  editorPlaceholder = "Type Question here!!!!";
  editorStyle = {

    'height': '300px',
    'overflow-y': 'auto'
  }
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']
    ]
  }

  Options = [
    { value: 1, ischecked: false },
    { value: 2, ischecked: false },
    { value: 3, ischecked: false },
    { value: 4, ischecked: false },
  ];
  constructor() { }
  ngOnInit() {
    this.TemplateType.valueChanges.subscribe(x => {
      this.isTemplatechange = true;
      if (x == '1') {
        this.isFirsttemplate = !this.isFirsttemplate;
        this.isSecondTemplate = false;
      }
      else if (x == '2') {
        this.isSecondTemplate = !this.isSecondTemplate;
        this.isFirsttemplate = false;
      }
      this.Options.map(x => x.ischecked = false);
    });
  }
  firstTemplate(Option: any) {
    this.Options.map(x => x.ischecked = false);
    Option.ischecked = true;

  }



}
