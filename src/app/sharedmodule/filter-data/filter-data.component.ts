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

  // filterKeyChange(event) {
  //   this.secondarykeysearch.emit(this.filterForm);
  //   this.filterForm.reset({ filterKey: this.filterForm.get('filterKey').value, searchKey: '', statusKey: this.filterForm.get('statusKey').value });
  // }

  filterData() {

    if ((this.filterForm.get('filterKey').valid || this.filterForm.get('statusKey').valid || this.filterForm.get('searchKey').valid)) {
      this.filterKeysearch.emit(this.filterForm.value);
    }

  }
  reset() {
    this.filterKeysearch.emit();
    this.filterForm.reset({ filterKey: '', searchKey: '', statusKey: '' });
    // this.secondaryfilterObject = [];
  }
}
