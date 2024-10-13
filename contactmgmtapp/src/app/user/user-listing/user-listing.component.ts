import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/interface/IUser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent implements OnInit, OnChanges {
  users: any[] = [];
  selectedUser: any = null;
  userForm!: FormGroup;

  constructor(private _userService: UserService) { }


  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getUsers();
  }


  getUsers() {
    this._userService.getUsers().subscribe((data: any[]) => {
      if (data != null) {
        this.users = data;
      }
    })
  }


  // Open the modal for editing a user
  openModal(user: any = null) {
    this.selectedUser = user;

  }

  newUserAddedAlert(event: any) {
    this.getUsers();
  }

  onDeleteUser(user: any) {
    this._userService.deleteUser(user.id).subscribe((data: any) => {
      if (data != null) {
        this.getUsers();
      }
    });
}

}
