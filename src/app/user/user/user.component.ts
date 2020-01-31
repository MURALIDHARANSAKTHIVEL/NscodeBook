import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { formatDate } from '@angular/common';
import { NotificationService } from 'src/app/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { subtract } from 'ngx-bootstrap/chronos/public_api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  imageUrl: any;
  rolesList: object = [];
  genderList: object = [];
  fileImageData: any = File;
  serviceBaseUrl = 'http://localhost:5000/ProfileImages/';
  defaultUserImage: string = "defaultUserImage.png";
  userKeyFlag: number;
  userNameExists: object = { message: '', isExist: false };
  constructor(private formBuilder: FormBuilder, private userservice: UserService,
    private notification: NotificationService, private router: ActivatedRoute,
    private route: Router) { }

  ngOnInit() {
    this.getRoles();
    this.getGenders();
    this.userEditInformation();
    this.imageUrl = this.serviceBaseUrl + this.defaultUserImage;
  }

  userForm: FormGroup = this.formBuilder.group({
    userKey: [],
    userName: [, [Validators.required]],
    roleKey: ['', [Validators.required]],
    genderTypeKey: ['', [Validators.required]],
    firstName: [, [Validators.required]],
    lastName: [, [Validators.required]],
    email: [, [Validators.required, Validators.email]],
    phoneNumber: [, [Validators.required, Validators.pattern(/^[6-9]\d{9}$/), Validators.maxLength(10)]],
    profileImage: [''],
    isActive: [true]

  });



  onImageChange(event) {
    if (event.target.files && event.target.files[0]) {

      this.fileImageData = event.target.files[0];
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.imageUrl = (event.target as FileReader).result;
      }
    }
  }

  getRoles() {
    this.userservice.getRoles().subscribe(data => {
      this.rolesList = data;
    });
  }

  getGenders() {
    this.userservice.getGenders().subscribe(data => {
      this.genderList = data;
    })
  }

  onSubmitUserForm() {
    var userFormData = new FormData();
    userFormData.append("UserData", JSON.stringify(this.userForm.getRawValue()));
    userFormData.append('ImageFile', this.fileImageData);
    if (this.userKeyFlag != 0) {
      this.userservice.updateUsers(userFormData, this.userKeyFlag).subscribe(data => {
        this.notification.statusFlag = true;
        this.notification.notificationMessage.next("Updated successfully");
        this.defaultpage();
      });
    }
    else {
      this.userservice.createUsers(userFormData).subscribe(data => {
        this.defaultpage();
        this.notification.statusFlag = true;
        this.notification.notificationMessage.next("created successfully");

      });
    }

  }
  userNameExist(event) {
    const userName = event.target.value || null;
    if (userName != null) {
      this.userservice.getUsersByUserName(this.userForm.value.userName).subscribe(data => {
        if (data.isExist == true) {
          this.userNameExists['message'] = "UserName Already Exists";
          this.userNameExists['isExist'] = true;
        }
        else {
          this.userNameExists['message'] = "";
          this.userNameExists['isExist'] = false;

        }
      });
    }
    else {
      this.userNameExists['message'] = "";
      this.userNameExists['isExist'] = true;
    }
  }

  userEditInformation() {
    this.router.queryParams.subscribe(data => {

      let userKey = data.userKey || 0;
      this.userKeyFlag = userKey;
      if (userKey != 0) {
        this.userservice.getUsersById(data.userKey).subscribe(data => {
          this.userForm.patchValue(data);
          this.userForm.get('userName').disable();
          this.imageUrl = this.serviceBaseUrl + (data.profileImage || this.defaultUserImage);
        })
      }
    })
  }

  reset() {
    this.userForm.reset({ userName: this.userForm.get('userName').value, isActive: true, genderTypeKey: '', roleKey: '' });
  }

  defaultpage() {
    this.route.navigate(['dashboard/user-details']);
  }
}
