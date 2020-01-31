import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role/role.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {
  MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule
} from '@angular/material';
import { ModalModule, TooltipModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  declarations: [RoleComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSvgIconModule.forRoot(),
    material,
   ngxBootstrap
  ]
})
export class RoleModule { }
