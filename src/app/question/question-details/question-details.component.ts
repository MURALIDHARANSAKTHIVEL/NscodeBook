import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.less']
})
export class QuestionDetailsComponent implements OnInit {
  questionsData: any;
  questionsDataKeys: any;

  constructor(private router: Router, private questionservice: QuestionService) { }
  ngOnInit() {
    this.questionservice.getQuestion().subscribe(data => {
      this.questionsData = data;
      this.questionsDataKeys = Object.keys(data[0]);
      console.log(this.questionsDataKeys);
      console.log(data)
    });

  }
  createQuestion() {
    console.log("dsdsad");
    this.router.navigate(['dashboard/question']);
  }





}
