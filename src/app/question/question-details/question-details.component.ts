import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NotificationService } from 'src/app/notification.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.less']
})
export class QuestionDetailsComponent implements OnInit {

  questionsDataSourceColumn: string[] = ["No", "Description", "templateType", "categoryName", "Edit", "isActive"];
  questionsDataSource = new MatTableDataSource();
  filterKeyObject: Object = [{ filterkey: 1, filterName: 'Template' }, { filterkey: 2, filterName: 'Category' }];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  spinnerLoader: boolean = true;
  constructor(private router: Router,
    private questionservice: QuestionService,
    private notify: NotificationService) { }

  ngOnInit() {
    this.getQuestions();
  }


  getQuestions(FilterForm?: object): void {
    this.spinnerLoader = false;
    this.questionservice.getQuestion(FilterForm || '').subscribe(data => {
      this.spinnerLoader = true;
      if (data.length == 0) {
        this.questionsDataSource.data = [];
        this.questionsDataSource.paginator = this.paginator;
      }
      else {
        this.questionsDataSource.data = data;
        this.paginator.firstPage();
        this.questionsDataSource.paginator = this.paginator;
      }
    });
  }

  navigateQuestionScreen(questionKey?: number): void {

    this.router.navigate(['dashboard/question/'], { queryParams: { questionKey: questionKey } });
  }


  statusOnChange(questionKey: number, changeData: any): void {
    changeData.options = [];

    this.questionservice.updateQuestion(questionKey, changeData).subscribe(data => {
      this.notify.statusFlag = true;
      this.notify.notificationMessage.next("updated successfully!!!");
    });
  }



}
