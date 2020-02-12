import { Component, OnInit} from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ICategory, ITemplate } from '../categoryInterface';
import { QuestionService } from '../question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.less'],
  styles: [':host>>>.tooltip-inner {padding:10px;font-weight:500;}']
})
export class QuestionComponent implements OnInit {

  optionsTemplateValue: number;
  questionEditFlag: boolean;
  questionKeyChange: number;
  categories: ICategory;
  templates: ITemplate;
  AnswerError: boolean = true;
  editorPlaceholder = "Type Question here!!!!";
  editorStyle = {

    'height': '250px',
    'overflow-y': 'auto'
  }
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'size': ['small'] }],
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
      question: [, [Validators.required]],
      IsActive: [true, [Validators.required]],
      options: this.formBuilder.array([

      ])

    })
  constructor(private questionservice: QuestionService, private formBuilder: FormBuilder,
    private router: ActivatedRoute, private notify: NotificationService, private route: Router) {

  }

  ngOnInit() {
    this.getCategories();
    this.getTemplate();
    this.getTemplateType();
    this.getOptionTemplate();
    this.editQuestionInformation();
  }

  get options():FormArray { return this.questionForm.get('options') as FormArray };

  getOptionTemplate():void {
    for (let i = 0; i < 4; i++) {
      this.options.push(this.formBuilder.group({
        optionKey: [0],
        isAnswer: [false, [Validators.required]],
        optionName: ['', [Validators.required]],
        isActive: [true, [Validators.required]]
      }));
    }
  }


  clickOption(formGroup: FormGroup):void {
    let TemplateType = this.questionForm.get('templateTypeKey').value;
    if (TemplateType == '1') {
      this.options.controls.filter(x => x == formGroup ? x.value.isAnswer = true : x.value.isAnswer = false);
    }
    else if (TemplateType == '2') {
      this.options.controls.filter(x => x == formGroup ? x.value.isAnswer = !x.value.isAnswer : x.value.isAnswer)
    }

  }

  questionFormSubmited():void{
    let isAnswer = this.options.controls.filter(x => x.value.isAnswer == true);
    if (isAnswer.length != 0) {
      if (this.questionEditFlag) {
        this.questionservice.updateQuestion(this.questionKeyChange, this.questionForm.value).subscribe(data => {
          this.defaultpage();
          this.notify.statusFlag = true;
          this.notify.notificationMessage.next('updated successfully !!!');
        });
      }
      else {
        this.questionservice.createQuestion(this.questionForm.value).subscribe(data => {
          this.defaultpage();
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

  editQuestionInformation():void {
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
    });

  }


  getCategories():void {
    this.questionservice.getCategories().subscribe(data => {
      this.categories = data;
    });

  }

  getTemplate():void {
    this.questionservice.getTemplate().subscribe(data => {
      this.templates = data;
    })
  }
  getTemplateType():void {
    this.questionForm.controls.templateTypeKey.valueChanges.subscribe(templateKey => {
      this.optionsTemplateValue = templateKey;
      this.options.controls.filter(x => x.value.isAnswer ? x.value.isAnswer = false : x.value.isAnswer);

    });
  }

  reset():void {
    this.questionForm.reset({ templateTypeKey: '', categoryKey: '' });
  }

  defaultpage():void {
    this.route.navigate(['dashboard/question-details']);

  }
}
