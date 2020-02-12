import { TestBed } from '@angular/core/testing';
import{ReactiveFormsModule,FormsModule} from'@angular/forms';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { QuestionService } from './question.service';
import { QuestionComponent } from './question/question.component';

describe('QuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({  imports: [ReactiveFormsModule],providers:[QuestionComponent]}));
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [QuestionService]
  }));

  it('should be created', () => {
    const service: QuestionService = TestBed.get(QuestionService);
    expect(service).toBeTruthy();
  });
});
