import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionComponent } from './question/question.component';
import{QuillModule} from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{TooltipModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [QuestionComponent],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot()

    
  ]
})
export class QuestionModule { }
