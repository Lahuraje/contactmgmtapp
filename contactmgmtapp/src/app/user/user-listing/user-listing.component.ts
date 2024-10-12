import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interface/IUser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent implements OnInit {
  users: any[]=[];
  selectedUser: any = null;
  constructor(private _userService:UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this._userService.getUsers().subscribe((data:any[])=>{
      if(data!=null){
        this.users=data;
      }
    })
  }
// Open the modal for adding or editing a user
openModal(user: any = null) {
  this.selectedUser = user;
}


// Save or update user data
saveUser(user: any) {
  if (user.id) {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index !== -1) this.users[index] = user; // Update existing user
  } else {
    user.id = this.users.length + 1;
    this.users.push(user); // Add new user
  }
}
}
