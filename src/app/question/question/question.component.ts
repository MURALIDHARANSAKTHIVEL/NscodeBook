import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Question } from '../Question';
import { Option } from '../Option';
import { QuestionService } from '../question.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.less']
})
export class QuestionComponent implements OnInit {

  questionData = new Question();
  isTemplatechange: boolean = true;
  isFirsttemplate: boolean = false;
  isSecondTemplate: boolean = false;
  categories: any;
  i: number;
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


  questionForm: FormGroup = this.formBuilder.group(
    {
      TemplateType: [],
      CategoryKey: [],
      Description: [],
      Options: this.formBuilder.array([

      ])

    })
  constructor(private questionservice: QuestionService, private formBuilder: FormBuilder) {

    console.log(this.questionForm.controls.Options)
  }




  ngOnInit() {

    this.questionservice.getCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    })

    for (this.i = 0; this.i < 4; this.i++) {

      this.Options.push(this.formBuilder.group({
        IsAnswer:[false],
        OptionName: [],
        IsActive:[true]
      }));

    }


    this.questionForm.controls.TemplateType.valueChanges.subscribe(x => {
      this.isTemplatechange = true;
      if (x == '1') {
        this.isFirsttemplate = !this.isFirsttemplate;
        this.isSecondTemplate = false;
      }
      else if (x == '2') {
        this.isSecondTemplate = !this.isSecondTemplate;
        this.isFirsttemplate = false;
      }
      this.questionData.Options.map(x => x.IsAnswer = false);
    });
  }


  get Options() { return this.questionForm.get('Options') };




  firstTemplate(Option: any) {
    this.questionData.Options.map(x => x.IsAnswer = false);
    Option.IsAnswer = true;

  }

check(i:any)
{
  console.log(i)
}

}
