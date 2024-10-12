import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  userForm!: FormGroup;
  showModal: boolean = false; // Controls the visibility of the modal
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  openModal() {
    this.userForm.reset();
    this.showModal = true;
  }

  
  closeModal() {
    this.userForm.reset();
    this.showModal = false;
  }

  
  submitForm() {
    if (this.userForm.valid) {
      console.log('Form Data:', this.userForm.value);
      this.closeModal(); 
      this.userForm.reset(); 
    } else {
      console.log('Form is invalid!');
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
