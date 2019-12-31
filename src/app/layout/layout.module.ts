import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { UserinfolistComponent } from './sidenav/userinfolist/userinfolist.component';



const material=[
  MatIconModule,
  MatButtonModule
  
];

@NgModule({
  declarations: [LayoutComponent, SidenavComponent, HeaderComponent, UserinfolistComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    material

  ]
})
export class LayoutModule { }
