import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionComponent } from './question/question.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule } from '@angular/material';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedmoduleModule } from '../sharedmodule/sharedmodule.module';

const material = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule
]
@NgModule({
  declarations: [QuestionComponent, QuestionDetailsComponent],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    HttpClientModule,
    material,
    SharedmoduleModule,
    AngularSvgIconModule.forRoot()



  ]
})
export class QuestionModule { }
