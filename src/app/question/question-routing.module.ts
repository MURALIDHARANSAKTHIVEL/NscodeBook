import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';


const routes: Routes = [
  {path:'question',component:QuestionComponent},
  {path:'question-details',component:QuestionDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
