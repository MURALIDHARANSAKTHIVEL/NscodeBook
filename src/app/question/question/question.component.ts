import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ICategory } from '../categoryInterface';
import { QuestionService } from '../question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.less']
  // styles:[':host>>>.tooltip-inner {padding:10px;font-weight:500;}']
})
export class QuestionComponent implements OnInit {

  optionsTemplate: number;
  questionEditFlag: boolean;
  questionKeyChange: number;
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
      description: [, [Validators.required]],
      IsActive: [true, [Validators.required]],
      options: this.formBuilder.array([

      ])

    })
  constructor(private questionservice: QuestionService, private formBuilder: FormBuilder,
    private router: ActivatedRoute, private notify: NotificationService) {

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
      this.questionKeyChange = questionKey;
      if (questionKey != 0) {
        this.questionEditFlag = true;
        this.questionservice.getQuestionById(data.questionKey).subscribe(data => {
          this.questionForm.patchValue(data);
        });
      }
      else {
        this.questionEditFlag = false;
      }
    })

  }

  get options() { return this.questionForm.get('options') as FormArray };

  selectAnswer(formGroup: FormGroup) {
    let TemplateType = this.questionForm.get('templateTypeKey').value;

    if (TemplateType == '1') {
      this.options.controls.filter(x => x == formGroup ? x.value.isAnswer = true : x.value.isAnswer = false);
    }
    else if (TemplateType == '2') {
      this.options.controls.filter(x => x == formGroup ? x.value.isAnswer = !x.value.isAnswer : x.value.isAnswer)
    }

  }

  questionFormSubmit() {
    let isAnswer = this.options.controls.filter(x => x.value.isAnswer == true)
    if (isAnswer.length != 0) {
      this.AnswerError = true
      if (this.questionEditFlag) {
        this.questionservice.updateQuestion(this.questionKeyChange, this.questionForm.value).subscribe(data => {
          this.notify.statusFlag = true;
          this.notify.notificationMessage.next('updated successfully !!!');

        });
      }
      else {
        this.questionservice.createQuestion(this.questionForm.value).subscribe(data => {
          this.questionForm.reset({ templateTypeKey: '', categoryKey: '' });
          this.notify.statusFlag = true;
          this.notify.notificationMessage.next('created successfully !!!');

        });
      }

    }
    else {
      this.notify.statusFlag = false;
      this.notify.notificationMessage.next('Mark correct option!!!');

    }

  }

}
