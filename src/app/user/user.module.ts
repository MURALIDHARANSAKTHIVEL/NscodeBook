import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { ModalModule, TooltipModule } from 'ngx-bootstrap';
import { SharedmoduleModule } from '../sharedmodule/sharedmodule.module';

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
  declarations: [UserComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    material,
    ngxBootstrap,
    SharedmoduleModule
  ]
})
export class UserModule { }
