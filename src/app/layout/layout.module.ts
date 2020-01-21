import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import {
  MatIconModule, MatButtonModule, MatTableModule
  , MatPaginatorModule, MatSortModule
} from '@angular/material';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { UserinfolistComponent } from './sidenav/userinfolist/userinfolist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from '../category/category.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ModalModule, PopoverModule, TooltipModule } from 'ngx-bootstrap';
import { TemplateComponent } from '../template/template.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



const material = [
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule

];
const ngxBootstrap = [
  ModalModule.forRoot(),
  TooltipModule.forRoot()
]

@NgModule({
  declarations: [
    LayoutComponent,
    SidenavComponent,
    HeaderComponent,
    UserinfolistComponent,
    CategoryComponent,
    TemplateComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    material,
    FormsModule,
    ReactiveFormsModule,
    AngularSvgIconModule.forRoot(),
    ngxBootstrap



  ],
  entryComponents: [CategoryComponent]
})
export class LayoutModule { }
