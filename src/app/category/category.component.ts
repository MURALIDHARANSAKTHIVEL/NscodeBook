import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from './category.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NotificationService } from '../notification.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {
  dataNotFound: boolean;

  constructor(private modelservice: BsModalService, private formbulider: FormBuilder,
    private categoryservice: CategoryService, private notification: NotificationService) { }
  @ViewChild('categorytemplate', { static: true }) categorytemplate;
  editCategoryFlag: boolean = false;
  editCategoryKey: number;
  errorMessage: string;

  ngOnInit() {

    this.getCategory();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  categoryModelRef: BsModalRef;
  categoryTemplateConfig: ModalOptions = { class: 'modal-dialog-centered' }
  categoryDataSourceColumn: string[] = ["No", "categoryName", "description", "shortName", "Edit", "Status"]
  categoryDataSource = new MatTableDataSource();

  categoryForm: FormGroup = this.formbulider.group({
    categoryKey: [0],
    categoryName: [, Validators.required],
    shortName: [, Validators.required],
    description: [, Validators.required],
    isActive: [true]

  })

  openModel(template: TemplateRef<any>) {
    this.errorMessage = "";
    this.categoryForm.reset({ categoryKey: 0, isActive: true });
    this.categoryModelRef = this.modelservice.show(template, this.categoryTemplateConfig);
  }

  saveCategory() {

    let notificationMessage;
    if (this.editCategoryFlag == true) {
      this.categoryservice.updateCategory(this.editCategoryKey, this.categoryForm.value).subscribe(data => {
        this.notification.statusFlag = true;
        this.getCategory();
        notificationMessage = "updated successfully";
        this.categoryModelRef.hide();
        this.notification.notificationMessage.next(notificationMessage);

      }, errors => {
        this.errorMessage = errors.error['message'];
      }
      )
    }
    else {
      this.categoryservice.createCategory(this.categoryForm.value).subscribe(data => {
        this.notification.statusFlag = true;
        this.getCategory();
        this.editCategoryFlag = false;
        notificationMessage = "created successfully";
        this.categoryModelRef.hide();
        this.notification.notificationMessage.next(notificationMessage);
      }, errors => {
        this.errorMessage = errors.error['message'];
      });
    }

  }



  getCategory(filterData?: object) {
    this.categoryservice.getCategory(filterData || '').subscribe(data => {
      if (data == null) {
        this.categoryDataSource.data = [];
        this.categoryDataSource.paginator = this.paginator;

      }
      else {
        this.categoryDataSource.data = data;
        this.paginator.firstPage();
        this.categoryDataSource.paginator = this.paginator;
      }
    })
  }

  editCategory(categoryKey: number) {
    this.editCategoryKey = categoryKey;
    this.categoryservice.getCategoryById(categoryKey).subscribe(data => {
      this.categoryModelRef = this.modelservice.show(this.categorytemplate);
      this.categoryForm.patchValue(data);
      this.editCategoryFlag = true;
    })

  }

  statusChange(categoryData: any, categoryKey: number) {
    let notificationMessage;
    this.categoryservice.updateCategory(categoryKey, categoryData).subscribe(data => {
      this.notification.statusFlag = true;
      notificationMessage = "updated successfully";
      this.notification.notificationMessage.next(notificationMessage);
    })
  }
}