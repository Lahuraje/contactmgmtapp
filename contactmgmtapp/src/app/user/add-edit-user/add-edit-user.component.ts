import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/interface/IUser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit, OnChanges {
  userForm!: FormGroup;
  showModal: boolean = false; // Controls the visibility of the modal
  isEditMode: boolean = false;

  @Input() userData: any = null; // Data passed for editing
  @Output() saveUser = new EventEmitter<any>(); // Emit event when user is saved

  _userFormData!: IUser;
  constructor(private fb: FormBuilder, private _userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [0],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    });


    console.log(this.userData)
    if (this.userData) {
      //this.isEditMode = true;
      this.openModal(this.userData)
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.userData != null || this.userData != undefined) {
      console.log(changes['userData'].currentValue)
      this.openModal(changes['userData'].currentValue);
    }
  }
  openModal(user: any = null) {
    this.showModal = true;
    if (user) {
      this.isEditMode = true;
      this.userForm.patchValue(user); // Populate form for editing
    } else {
      this.isEditMode = false;
      this.userForm.reset(); // Reset form for adding a new user
    }
  }


  closeModal() {
    this.userForm.reset();
    this.showModal = false;
  }


  submitForm() {
    if (this.userForm.valid) {
      const formData = { ...this.userData, ...this.userForm.value };
      formData.id = formData.id > 0 ? formData.id : 0;

      if (formData.id > 0) {
        this._userService.updateUser(formData.id,formData).subscribe((data: any) => {
          console.log(data)
          if (data != null) {
            this.saveUser.emit(formData); // Emit event with form data
            this.closeModal();
          }
        })
      } else {
        this._userService.createUser(formData).subscribe((data: any) => {
          console.log(data)
          if (data != null) {
            this.saveUser.emit(formData); // Emit event with form data
            this.closeModal();
          }
        })
      }
    }
  }

  get id() {
    return this.userForm.get('id');
  }
  get firstName() {
    return this.userForm.get('firstName');
  }
  get lastName() {
    return this.userForm.get('lastName');
  }
  get email() {
    return this.userForm.get('email');
  }
}
