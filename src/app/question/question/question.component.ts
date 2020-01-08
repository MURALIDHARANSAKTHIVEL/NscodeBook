import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ICategory } from '../categoryInterface';
import { QuestionService } from '../question.service';
import { ActivatedRoute } from '@angular/router';

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

      templateTypeKey: ['', [Validators.required, Validators.min(1)]],
      categoryKey: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required]],
      IsActive: [true, [Validators.required]],
      options: this.formBuilder.array([

      ])

    })
  constructor(private questionservice: QuestionService, private formBuilder: FormBuilder,
    private router: ActivatedRoute) {

  }

  ngOnInit() {
    //Get categories from Questionservice class
    this.questionservice.getCategories().subscribe(data => {
      this.categories = data;
    });

    //for 4 option default push the formgroup in the formArray
    for (let i = 0; i < 4; i++) {
      this.options.push(this.formBuilder.group({
        isAnswer: [false, [Validators.required]],
        optionName: ['', [Validators.required]],
        isActive: [true, [Validators.required]]
      }));
      console.log()
    }
    // Observe Template change.
    this.questionForm.controls.templateTypeKey.valueChanges.subscribe(x => {
      this.optionsTemplate = x;
      this.options.controls.filter(x => x.value.isAnswer ? x.value.isAnswer = false : x.value.isAnswer);

    });

    this.router.queryParams.subscribe(data => {
      let questionKey = data.questionKey || 0;
      if (questionKey != 0) {
        this.questionservice.getQuestionById(data.questionKey).subscribe(data => {
          this.questionForm.patchValue(data);
        });
      }
    })

  }

  get options() { return this.questionForm.get('options') as FormArray };

  selectAnswer(formGroup: FormGroup) {
    let TemplateType = this.questionForm.get('templateTypeKey').value;

    if (TemplateType == '1') {//single select option
      //this.options.controls.filter( x=> x.value.isAnswer?!x.value.isAnswer:x.value.isAnswer);
      this.options.controls.filter(x => x == formGroup ? x.value.isAnswer = true : x.value.isAnswer = false);
    }
    else if (TemplateType == '2') {//Mutiple select option
      this.options.controls.filter(x => x == formGroup ? x.value.isAnswer = !x.value.isAnswer : x.value.isAnswer)
    }

  }

  questionFormSubmit() {
    let isAnswer = this.options.controls.filter(x => x.value.isAnswer == true)
    if (isAnswer.length != 0) {

      this.questionservice.createQuestion(this.questionForm.value).subscribe(data => {
        console.log(data);
      })
    }
    else {
      this.AnswerError = false;
    }

  }

}
