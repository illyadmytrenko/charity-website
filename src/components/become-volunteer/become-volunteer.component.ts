import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
   selector: 'become-volunteer',
   templateUrl: './become-volunteer.component.html',
   styleUrls: ['./become-volunteer.component.css']
})
export class BecomeVolunteerComponent {
   title = "Become Volunteer";
   way = "Home > Contact Us > Become Volunteer";

   constructor(private snackBar: MatSnackBar) { }

   horizontalPosition: MatSnackBarHorizontalPosition = 'center';
   verticalPosition: MatSnackBarVerticalPosition = 'top';

   formData = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      age: 0,
      region: '',
      message: ''
   };

   nameRegex = /^[a-zA-Zа-яёЁіІїЇєЄ ]+$/;
   emailRegex = /^[0-9a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;
   phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
   regionRegex = /^[a-zA-Zа-яёЁіІїЇєЄ0-9\s]*$/

   validation(): boolean {
      let firstNameError = document.getElementById('become_firstname_error');
      let lastNameError = document.getElementById('become_lastname_error');
      let emailError = document.getElementById('become_email_error');
      let phoneError = document.getElementById('become_phone_error');
      let ageError = document.getElementById('become_age_error');
      let regionError = document.getElementById('become_region_error');
      let messageError = document.getElementById('become_message_error');

      if (this.formData.firstName.trim() === '' && firstNameError) {
         firstNameError.innerText = 'First Name is required.';
         return false;
      } else if (firstNameError) {
         firstNameError.innerText = '';
      }

      if (!this.nameRegex.test(this.formData.firstName) && firstNameError) {
         firstNameError.innerText = 'Required a valid first name.';
         return false;
      } else if (firstNameError) {
         firstNameError.innerText = '';
      }

      if (this.formData.lastName.trim() === '' && lastNameError) {
         lastNameError.innerText = 'Last Name is required.';
         return false;
      } else if (lastNameError) {
         lastNameError.innerText = '';
      }

      if (!this.nameRegex.test(this.formData.lastName) && lastNameError) {
         lastNameError.innerText = 'Required a valid last name.';
         return false;
      } else if (lastNameError) {
         lastNameError.innerText = '';
      }

      if (this.formData.email.length < 5 && emailError) {
         emailError.innerText = 'Required a not empty email.';
         return false;
      } else if (emailError) {
         emailError.innerText = '';
      }

      if (!this.emailRegex.test(this.formData.email) && emailError) {
         emailError.innerText = 'Required a valid email.';
         return false;
      } else if (emailError) {
         emailError.innerText = '';
      }

      if (this.formData.phoneNumber.trim() === '' && phoneError) {
         phoneError.innerText = 'Phone Number is required.';
         return false;
      } else if (phoneError) {
         phoneError.innerText = '';
      }

      if (!this.phoneRegex.test(this.formData.phoneNumber) && phoneError) {
         phoneError.innerText = 'Required a valid phone number.';
         return false;
      } else if (phoneError) {
         phoneError.innerText = '';
      }

      if (this.formData.age === 0 && ageError) {
         ageError.innerText = 'Age is required.';
         return false;
      } else if (ageError) {
         ageError.innerText = '';
      }

      if (this.formData.region.trim() === '' && regionError) {
         regionError.innerText = 'Region is required.';
         return false;
      } else if (regionError) {
         regionError.innerText = '';
      }

      if (!this.regionRegex.test(this.formData.region) && regionError) {
         regionError.innerText = 'Required a valid region.';
         return false;
      } else if (regionError) {
         regionError.innerText = '';
      }

      if (this.formData.message.trim() === '' && messageError) {
         messageError.innerText = 'Message is required.';
         return false;
      } else if (messageError) {
         messageError.innerText = '';
      }

      return true;
   }

   onSubmit() {
      if (this.validation()) {
         console.log(this.formData);
         this.snackBar.open('We have received your application, our main volunteer will contact you soon!', 'Close', { duration: 5000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition });
      }
   }
}; 
