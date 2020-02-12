import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { MatSnackBarModule, MatSortModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { AngularSvgIconModule } from 'angular-svg-icon';
import{NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const material = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
]
@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    AngularSvgIconModule,
    NgbModule,
    material,
    FormsModule,
    ReactiveFormsModule

    
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
