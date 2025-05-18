import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
   selector: 'modal-login',
   templateUrl: './modal-login.component.html',
   styleUrls: ['./modal-login.component.css']
})

export class ModalLoginComponent {
   constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private dialogRef: MatDialogRef<ModalLoginComponent>,
      private snackBar: MatSnackBar) { }

   horizontalPosition: MatSnackBarHorizontalPosition = 'center';
   verticalPosition: MatSnackBarVerticalPosition = 'top';

   formData = {
      email: '',
      password: '',
      userActive: false
   };

   emailRegex = /^[0-9a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;

   validation(): boolean {
      let emailError = document.getElementById('email_error');
      let passwordError = document.getElementById('password_error');

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

      if ((this.formData.password.length < 8 || this.formData.password.length > 20) && passwordError) {
         passwordError.innerText = 'Required a password between 8 and 20 characters.';
         return false;
      } else if (passwordError) {
         passwordError.innerText = '';
      }

      return true;
   }

   onSubmit() {
      let emailError = document.getElementById('email_error');
      let passwordError = document.getElementById('password_error');

      let account = document.getElementById('account');
      let login = document.getElementById('login');
      let register = document.getElementById('register');

      let settings = document.getElementById('settings-footer');
      let donationHistory = document.getElementById('donationHistory-footer');
      let loginFooter = document.getElementById('login-footer');
      let registerFooter = document.getElementById('register-footer');

      if (this.validation()) {
         this.http.post('http://localhost:3000/login', this.formData)
            .subscribe((response: any) => {
               console.log('User log in successfully');
               this.snackBar.open('Login is successful!', 'Close', { duration: 3000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition });
               this.dialogRef.close();

               const username = response.username
               console.log(username);

               this.formData.userActive = true;
               localStorage.setItem('userData', JSON.stringify({ email: this.formData.email, userActive: this.formData.userActive, username: username }));

               if (account) {
                  account.classList.add('active');
                  account.classList.remove('d-none');
               }

               if (settings) {
                  settings.classList.remove('d-none');
               }

               if (donationHistory) {
                  donationHistory.classList.remove('d-none');
               }

               if (login) login.classList.add('d-none');
               if (register) register.classList.add('d-none');

               if (loginFooter) loginFooter.classList.add('d-none');
               if (registerFooter) registerFooter.classList.add('d-none');
            }, error => {
               console.log(error.error.error);
               console.error('Error during log in:', error);
               if (error.error.error == "Invalid email" && emailError) emailError.innerText = "No user was found with such email.";
               else if (error.error.error == "Invalid password" && passwordError) passwordError.innerText = "No user was found with such password.";
            });
      }
   }
}