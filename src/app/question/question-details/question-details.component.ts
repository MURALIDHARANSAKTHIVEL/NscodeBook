import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.less']
})
export class QuestionDetailsComponent implements OnInit {

  questionsDataSourceColumn: string[] = ["No", "Description", "templateTypeKey", "categoryKey", "Edit", "isActive"];
  questionsDataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router,
    private questionservice: QuestionService,
    private notify: NotificationService) { }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions(): void {
    this.questionservice.getQuestion().subscribe(data => {
      this.questionsDataSource.data = data;
      this.questionsDataSource.paginator = this.paginator;
      this.questionsDataSource.sort = this.sort;
    });
  }

  navigateQuestionScreen(questionKey?: number) {

    this.router.navigate(['dashboard/question/'], { queryParams: { questionKey: questionKey } });
  }


  statusOnChange(questionKey: number, changeData: any) {
    changeData.options = [{ 'optionKey': 1, 'questionKey': 3, 'optionName': 'synchronous', 'isAnswer': true, 'isActive': true }, { 'optionKey': 2, 'questionKey': 3, 'optionName': 'synch', 'isAnswer': true, 'isActive': false }, { 'optionKey': 3, 'questionKey': 3, 'optionName': 'hronous', 'isAnswer': false, 'isActive': true }, { 'optionKey': 4, 'questionKey': 3, 'optionName': 'chronous', 'isAnswer': false, 'isActive': true }];

    this.questionservice.updateQuestion(questionKey, changeData).subscribe(data => {
      this.notify.statusFlag = true;
      this.notify.notificationMessage.next("updated successfully!!!");
    });
  }



}
