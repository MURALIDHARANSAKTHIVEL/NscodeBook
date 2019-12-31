import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  // {path:'',redirectTo:'login',pathMatch:'full'},
  // {path:'login',loadChildren:()=>import('./login/login.module').then(m=>m.LoginModule)},
   {path:'',redirectTo:'dashboard',pathMatch:'full'},
   {path:'dashboard',loadChildren:()=>import('./layout/layout.module').then(m=>m.LayoutModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
