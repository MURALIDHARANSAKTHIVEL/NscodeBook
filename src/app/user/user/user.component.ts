import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { NotificationService } from 'src/app/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  userNameExists: object = { message: '', isExist: true, checkavailability: true };
  constructor(private formBuilder: FormBuilder, private userservice: UserService,
    private notification: NotificationService, private router: ActivatedRoute,
    private route: Router) { }

  ngOnInit() {
    this.getRoles();
    this.getGenders();

    this.userEditInformation();
    this.imageUrl = this.serviceBaseUrl + this.defaultUserImage;

    this.userForm.controls['userName'].valueChanges.subscribe(value => {
      if (value == '') {
        this.userNameExists['checkavailability'] = true;
      }
      else {
        this.userNameExists['checkavailability'] = false;
      }
      this.userNameExists['isExist'] = true;
      this.userNameExists['message'] = "";
    })
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



  onImageChange(event):void {
    if (event.target.files && event.target.files[0]) {

      this.fileImageData = event.target.files[0];
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.imageUrl = (event.target as FileReader).result;
      }
    }
  }

  getRoles():void {
    this.userservice.getRoles().subscribe(data => {
      this.rolesList = data;
    });
  }

  getGenders():void {
    this.userservice.getGenders().subscribe(data => {
      this.genderList = data;
    })
  }

  onSubmitUserForm():void {
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

      }, error => {

        this.notification.statusFlag = false;
        this.notification.notificationMessage.next(error.error.message)
      });
    }

  }
  userNameExistCheck():void {
    this.userservice.getUsersByUserName(this.userForm.value.userName).subscribe(data => {
      if (data.isExist == true) {
        this.userNameExists['message'] = "That userName is Taken. Try another";
        this.userNameExists['isExist'] = true;
      }
      else {
        this.userNameExists['message'] = "That userName is available";
        this.userNameExists['isExist'] = false;
      }
      this.userNameExists['checkavailability'] = true;
    });


  }

  userEditInformation():void {
    this.router.queryParams.subscribe(data => {
      let userKey = data.userKey || 0;
      this.userKeyFlag = userKey;
      if (userKey != 0) {

        this.userservice.getUsersById(data.userKey).subscribe(data => {
          this.userForm.patchValue(data);
          this.userForm.get('userName').disable();
          this.userNameExists['checkavailability'] = true;
          this.userNameExists['show'] = true;
          this.userNameExists['isExist'] = false;
          this.imageUrl = this.serviceBaseUrl + (data.profileImage || this.defaultUserImage);
        })
      }
    })
  }

  reset():void {
    if (this.userForm.get('userKey').value == null) {
      this.userForm.reset({ isActive: true, genderTypeKey: '', roleKey: '' });
      this.userNameExists['checkavailability'] = true;
    }
    else {
      this.userForm.reset({ userName: this.userForm.get('userName').value, isActive: true, genderTypeKey: '', roleKey: '' });
    }
  }

  defaultpage():void {
    this.route.navigate(['dashboard/user-details']);
  }
}
