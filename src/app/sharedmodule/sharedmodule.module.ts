import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDataComponent } from './filter-data/filter-data.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableDataNotFoundComponent } from './table-data-not-found/table-data-not-found.component';



@NgModule({
  declarations: [FilterDataComponent, TableDataNotFoundComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [FilterDataComponent,TableDataNotFoundComponent]
})
export class SharedmoduleModule { }
