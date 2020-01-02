import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from '../login/login.component';


const routes: Routes = [
  {path:'',component:LayoutComponent,
children:[
{path:'',loadChildren:()=>import('../test/test.module').then(m=>m.TestModule)},
{path:'',loadChildren:()=>import('../question/question.module').then(m=>m.QuestionModule)}

]
}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
