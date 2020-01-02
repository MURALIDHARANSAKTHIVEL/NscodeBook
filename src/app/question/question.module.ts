import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionComponent } from './question/question.component';
import{QuillModule} from 'ngx-quill';

@NgModule({
  declarations: [QuestionComponent],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    QuillModule.forRoot()

    
  ]
})
export class QuestionModule { }
