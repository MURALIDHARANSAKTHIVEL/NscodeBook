import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.less']
})
export class UserDetailsComponent implements OnInit {
  userDataSourceColumn: string[] = ["No", "UserName", "FirstName","LastName","Email", "Role", "Edit", "Status"];
  userDataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private userservice: UserService, private route: Router,
    private notification:NotificationService) { }

  ngOnInit() {
    this.getUsers();
  }


  getUsers() {
    this.userservice.getUsers().subscribe(data => {
      this.userDataSource.data = data;
      this.userDataSource.paginator = this.paginator;
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
