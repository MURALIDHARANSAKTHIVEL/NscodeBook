import { Component, OnInit } from '@angular/core';
import { TemplateService } from './template.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.less'],
  styles:[':host>>>.tooltip-inner {padding:10px;font-weight:500;}']
})
export class TemplateComponent implements OnInit {

  constructor(private templateservice: TemplateService) { }
templateDetails:Object[]=[];
  ngOnInit() {

    this.templateservice.getTemplate().subscribe(data => {
    this.templateDetails=data;
    })
  }

}
