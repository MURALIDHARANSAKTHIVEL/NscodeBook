import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ICategory } from '../categoryInterface';
import { QuestionService } from '../question.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.less']
})
export class QuestionComponent implements OnInit {

  optionsTemplate: number;
  categories: ICategory;
  AnswerError: boolean = true;
  editorPlaceholder = "Type Question here!!!!";
  editorStyle = {

    'height': '250px',
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
      TemplateTypeKey: ['', [Validators.required,Validators.min(1)]],
      CategoryKey: ['', [Validators.required,Validators.min(1)]],
      Description: ['', [Validators.required]],
      IsActive: [true, [Validators.required]],
      Options: this.formBuilder.array([

      ])

    })
  constructor(private questionservice: QuestionService, private formBuilder: FormBuilder) {

  }




  ngOnInit() {
    //Get categories from Questionservice class
    this.questionservice.getCategories().subscribe(data => {
      this.categories = data;
    });

    //for 4 option default push the formgroup in the formArray
    for (let i = 0; i < 4; i++) {

      this.Options.push(this.formBuilder.group({
        IsAnswer: [false, [Validators.required]],
        OptionName: ['', [Validators.required]],
        IsActive: [true, [Validators.required]]
      }));

    }
    // Observe Template change.
    this.questionForm.controls.TemplateTypeKey.valueChanges.subscribe(x => {
      this.optionsTemplate = x;
      this.Options.controls.map(x => x.value.IsAnswer = false);
    });
  }

  get Options() { return this.questionForm.get('Options') as FormArray };

  selectAnswer(formGroup: FormGroup) {
    let TemplateType = this.questionForm.get('TemplateTypeKey').value;

    if (TemplateType == '1') {//single select option
      this.Options.controls.map(x => x.value.IsAnswer = false);
      this.Options.controls.filter(x => x == formGroup).map(y => y.value.IsAnswer = true);
    }
    else if (TemplateType == '2') {//Mutiple select option
      this.Options.controls.filter(x => x == formGroup).map(y => y.value.IsAnswer = !y.value.IsAnswer);
    }

  }

  questionFormSubmit() {
    let IsAnswer = this.Options.controls.filter(x => x.value.IsAnswer == true)
    if (IsAnswer.length!=0) {

      this.questionservice.createQuestion(this.questionForm.value).subscribe(data => {
        console.log(data);
      })
    }
    else {
      this.AnswerError = false;
    }

  }

}
