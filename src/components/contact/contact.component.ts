import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
   selector: 'contact',
   templateUrl: './contact.component.html',
   styleUrls: ['./contact.component.css']
})
export class ContactComponent {
   title = "Contact Us";
   way = "Home > Contact Us";

   constructor(private snackBar: MatSnackBar) { }

   horizontalPosition: MatSnackBarHorizontalPosition = 'center';
   verticalPosition: MatSnackBarVerticalPosition = 'top';

   formData = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      message: ''
   };

   nameRegex = /^[a-zA-Zа-яА-яёЁіІїЇєЄ ]+$/;
   emailRegex = /^[0-9a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;

   validation(): boolean {
      let firstNameError = document.getElementById('contact_firstname_error');
      let lastNameError = document.getElementById('contact_lastname_error');
      let emailError = document.getElementById('contact_email_error');
      let phoneError = document.getElementById('contact_phone_error');
      let messageError = document.getElementById('contact_message_error');

      if (this.formData.firstName.trim() === '' && firstNameError) {
         firstNameError.innerText = 'First Name is required.';
         return false;
      } else if (firstNameError) {
         firstNameError.innerText = '';
      }

      if (!this.nameRegex.test(this.formData.firstName) && firstNameError) {
         firstNameError.innerText = 'Required a valid first name.';
         return false;
      } else if (emailError) {
         emailError.innerText = '';
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
      } else if (emailError) {
         emailError.innerText = '';
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

      if (this.formData.message.trim() === '' && messageError) {
         messageError.innerText = 'Message is required.';
         return false;
      } else if (messageError) {
         messageError.innerText = '';
      }

      if (this.formData.phoneNumber.trim() === '' && phoneError) {
         phoneError.innerText = 'Phone Number is required.';
         return false;
      } else if (phoneError) {
         phoneError.innerText = '';
      }

      return true;
   }

   onSubmit() {
      if (this.validation())
         this.snackBar.open('We have received your message. We will contact you back soon!', 'Close', { duration: 5000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition });
   }
}; 