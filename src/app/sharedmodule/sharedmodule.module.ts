import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDataComponent } from './filter-data/filter-data.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableDataNotFoundComponent } from './table-data-not-found/table-data-not-found.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material';



@NgModule({
  declarations: [FilterDataComponent, TableDataNotFoundComponent, ProgressSpinnerComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  exports: [FilterDataComponent,TableDataNotFoundComponent,ProgressSpinnerComponent]
})
export class SharedmoduleModule { }
