import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  userForm!: FormGroup;
  showModal: boolean = false; // Controls the visibility of the modal
  isEditMode: boolean = false;

  @Input() userData: any = null; // Data passed for editing
  @Output() saveUser = new EventEmitter<any>(); // Emit event when user is saved
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    });
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
      this.saveUser.emit(formData); // Emit event with form data
      this.closeModal();
    }
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
