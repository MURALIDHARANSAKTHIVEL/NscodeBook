import { Option } from './Option';

export class Question {
  TemplateTypeKey?: number;
  CategoryKey?: number;
  Description?: string;
  IsActive?: boolean;
  Options?:Option[]=[];
}

