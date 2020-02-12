import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filter-data',
  templateUrl: './filter-data.component.html',
  styleUrls: ['./filter-data.component.less']
})
export class FilterDataComponent implements OnInit {


  @Input('filterKeyObject') filterKeyObject: Object = [];
  @Output('filterKeysearch') filterKeysearch = new EventEmitter<FormGroup>();


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  filterForm: FormGroup = this.formBuilder.group({
    filterKey: ['', [Validators.required]],
    statusKey: ['', [Validators.required]],
    searchKey: ['', [Validators.required]]
  })

  filterData(): void {

    let filterkey = this.filterForm.get('filterKey').valid;
    let searchKey = this.filterForm.get('statusKey').valid
    let statusKey = this.filterForm.get('searchKey').valid
    if ((filterkey || searchKey || statusKey)) {

      this.filterKeysearch.emit(this.filterForm.value);
    }


  }

  filterInputKeyPress(event: any): void {
    if (event.keyCode == 13) {
      this.filterData();
    }
  }

  reset(): void {
    this.filterKeysearch.emit();
    this.filterForm.reset({ filterKey: '', searchKey: '', statusKey: '' });

  }
}
