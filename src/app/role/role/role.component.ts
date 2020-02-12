import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { RoleService } from '../role.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.less']
})
export class RoleComponent implements OnInit {



  constructor(private roleService: RoleService,
    private modelservice: BsModalService,
    private formbuilder: FormBuilder,
    private notifyservice: NotificationService
  ) { }

  ngOnInit() {
    this.getRoles();
    this.getAllPermissions();
  }
  spinnerLoader: boolean = true;
  roleDataSourceColumn: string[] = ["No", "RoleName", "Edit", "Status"];
  roleDataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('roleTemplate', { static: true }) roleTemplate;
  roleTemplateRef: BsModalRef;
  roleTemplateConfig: ModalOptions = { class: 'modal-lg modal-dialog-centered' }
  permissionCount: number;
  globalPermissions: FormArray;
  roleForm: FormGroup = this.formbuilder.group({
    roleKey: [],
    roleName: [, [Validators.required]],
    isActive: [true],
    permissionType: this.formbuilder.array([
    ])

  });

  getRoles(filterForm?: object): void {
    this.spinnerLoader = false;
    this.roleService.getRoles(filterForm || '').subscribe(data => {
      this.spinnerLoader = true;
      if (data == null) {
        this.roleDataSource.data = [];
        this.roleDataSource.paginator = this.paginator;

      }
      else {

        this.roleDataSource.data = data;
        this.paginator.firstPage();
        this.roleDataSource.paginator = this.paginator;
      }

    });
  }

  createRole(): void {
    this.roleForm.reset({ isActive: true, permissionType: this.globalPermissions });
    this.roleTemplateRef = this.modelservice.show(this.roleTemplate, this.roleTemplateConfig);
  }

  get permissions(): FormArray { return this.roleForm.get('permissionType') as FormArray };

  getAllPermissions(): void {
    this.roleService.getPermissions().subscribe(data => {
      this.permissionCount = data.length;
      this.getPermissionFormArray(this.permissionCount);
      this.roleForm.get('permissionType').patchValue(data);
      this.globalPermissions = data;
    });

  }

  getPermissionFormArray(permissionCount: number): void {
    for (let i = 0; i < permissionCount; i++) {
      this.permissions.push(this.formbuilder.group({
        permissionTypeKey: [],
        permissionType: [],
        shortName: [],
        isActive: [true]
      }));
    }

  }

  getPermissionByRoleId(roleKey: number): void {
    if (roleKey != null) {
      this.roleService.getPermissionsByRole(roleKey).subscribe(data => {
        this.roleForm.get('permissionType').patchValue(data);
      });
    }


  }
  getRoleById(roleKey: number): void {
    if (roleKey != null) {
      this.roleService.getRoleById(roleKey).subscribe(data => {
        this.roleForm.patchValue(data);

      });
    }
  }

  EditRole(roleKey: number): void {
    this.createRole();
    this.getPermissionByRoleId(roleKey);
    this.getRoleById(roleKey);
  }


  saveRole(roleKey: number): void {
    if (roleKey == null) {
      this.roleForm.value.roleKey = 0;
      this.roleService.createRoles(this.roleForm.value).subscribe(data => {
        this.closeModel();
        this.notifyservice.statusFlag = true;
        this.notifyservice.notificationMessage.next('created successfully !!!');
      });
    }
    else {
      this.roleService.updateRoles(roleKey, this.roleForm.value).subscribe(data => {
        this.closeModel();
        this.notifyservice.statusFlag = true;
        this.notifyservice.notificationMessage.next('updated successfully !!!');
      });
    }
  }
  closeModel(): void {
    this.getRoles();
    this.roleTemplateRef.hide();
  }

  statusChange(roleForm: any, roleKey: number): void {
    roleForm.PermissionType = [];
    this.roleService.updateRoles(roleKey, roleForm).subscribe(data => {
      this.notifyservice.statusFlag = true;
      this.notifyservice.notificationMessage.next('updated successfully !!!');
    })
  }


}
