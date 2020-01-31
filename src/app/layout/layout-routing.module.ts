import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from '../login/login.component';
import { CategoryComponent } from '../category/category.component';
import { TemplateComponent } from '../template/template.component';


const routes: Routes = [
  {path:'',component:LayoutComponent,
children:[
{path:'',loadChildren:()=>import('../test/test.module').then(m=>m.TestModule)},
{path:'',loadChildren:()=>import('../question/question.module').then(m=>m.QuestionModule)},
{path:'',loadChildren:()=>import('../role/role.module').then(m=>m.RoleModule)},
{path:'',loadChildren:()=> import('../user/user.module').then(m=>m.UserModule)},
{path:'category',component:CategoryComponent},
{path:'template',component:TemplateComponent},

]
}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
