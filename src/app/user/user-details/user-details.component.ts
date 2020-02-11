import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.less']
})
export class UserDetailsComponent implements OnInit {
  userDataSourceColumn: string[] = ["No", "UserName", "Email", "Role", "Edit", "Status"];
  filterKeyObject = [{ filterkey: 1, filterName: 'UserName' }, { filterkey: 2, filterName: 'Role' }, { filterkey: 3, filterName: 'Email' }]
  userDataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private userservice: UserService, private route: Router,
    private notification: NotificationService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(filterdata?: Object) {

    this.userservice.getUsers(filterdata || '').subscribe(data => {
      if (data == null) {

        this.userDataSource.data = [];
        this.userDataSource.paginator = this.paginator;
      }
      else {
        this.userDataSource.data = data;
        this.paginator.firstPage();
        this.userDataSource.paginator = this.paginator;

      }
    })
  }

  statusChange(userFormData: any, userKey: number) {
    const formData = new FormData();
    formData.append("UserData", JSON.stringify(userFormData));
    this.userservice.updateUsers(formData, userKey).subscribe(data => {
      this.notification.statusFlag = true;
      this.notification.notificationMessage.next("updated successfully");
    })
  }

  navigateUserscreen(userKey?: number) {
    this.route.navigate(['dashboard/user/'], { queryParams: { userKey: userKey } });

  }

}
