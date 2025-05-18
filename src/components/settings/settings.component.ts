import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
   selector: 'settings',
   templateUrl: './settings.component.html',
   styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
   constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

   title = 'Settings';
   way = 'Home > My Account > Settings';

   horizontalPosition: MatSnackBarHorizontalPosition = 'center';
   verticalPosition: MatSnackBarVerticalPosition = 'top';

   formDataPersonal = {
      fullName: '',
      phoneNum: '',
      country: '',
      city: '',
      street: '',
      postIndex: '',
   };

   formDataPassword = {
      oldPassword: '',
      confirmOldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
   };

   ngOnInit() {
      const userDataPersonalString = localStorage.getItem('userDataPersonal');

      if (userDataPersonalString) {
         try {
            const userDataPersonal = JSON.parse(userDataPersonalString);
            this.formDataPersonal = { ...this.formDataPersonal, ...userDataPersonal };
         } catch (error) {
            console.error('Error parsing data from local storage:', error);
         }
      }
   }

   async validationPassword(): Promise<boolean> {
      const { oldPassword, confirmOldPassword, newPassword, confirmNewPassword } = this.formDataPassword;
      const oldPasswordError = document.getElementById('oldPassword_error');
      const confirmOldPasswordError = document.getElementById('confirmOldPassword_error');
      const newPasswordError = document.getElementById('newPassword_error');
      const confirmNewPasswordError = document.getElementById('confirmNewPassword_error');

      const userDataString = localStorage.getItem('userData');
      if (!userDataString) {
         console.error('User data not found in localStorage');
         return false;
      }

      const userData = JSON.parse(userDataString);

      try {
         const response: any = await this.http.post('http://localhost:3000/check', {
            email: userData.email,
            password: oldPassword
         }).toPromise();

         if (response && response.success && response.isPasswordValid) {
            showErrorMessage(oldPasswordError, '');
            if (oldPassword !== confirmOldPassword) {
               showErrorMessage(confirmOldPasswordError, 'Passwords do not match.');
               return false;
            } else if (confirmOldPasswordError) {
               showErrorMessage(confirmOldPasswordError, '');
            }

            if (newPassword.length < 8 || newPassword.length > 20) {
               showErrorMessage(newPasswordError, 'Required a password between 8 and 20 characters.');
               return false;
            } else if (newPasswordError) {
               showErrorMessage(newPasswordError, '');
            }

            if (newPassword === oldPassword) {
               showErrorMessage(newPasswordError, 'The new password must be different from the old one.');
               return false;
            } else if (newPasswordError) {
               showErrorMessage(newPasswordError, '');
            }

            if (newPassword !== confirmNewPassword) {
               showErrorMessage(confirmNewPasswordError, 'Passwords do not match.');
               return false;
            } else if (confirmNewPasswordError) {
               showErrorMessage(confirmNewPasswordError, '');
            }

            return true;
         } else {
            showErrorMessage(oldPasswordError, 'The password is wrong.');
            return false;
         }
      } catch (error) {
         console.error('Error checking old password:', error);
         showErrorMessage(oldPasswordError, 'The password is wrong.');

         return false;
      }

      function showErrorMessage(element: HTMLElement | null, message: string): void {
         if (element) {
            element.innerText = message;
         }
      }
   }

   onSubmitPersonal() {
      const userDataPersonalString = localStorage.getItem('userDataPersonal');

      if (!userDataPersonalString) localStorage.setItem('userDataPersonal', JSON.stringify(this.formDataPersonal));
      else {
         const userDataPersonal = JSON.parse(userDataPersonalString);

         userDataPersonal.fullName = this.formDataPersonal.fullName;
         userDataPersonal.phoneNum = this.formDataPersonal.phoneNum;
         userDataPersonal.country = this.formDataPersonal.country;
         userDataPersonal.city = this.formDataPersonal.city;
         userDataPersonal.postIndex = this.formDataPersonal.postIndex;
         userDataPersonal.street = this.formDataPersonal.street;

         const updatedUserDataPersonalString = JSON.stringify(userDataPersonal);
         localStorage.setItem('userDataPersonal', updatedUserDataPersonalString);

         this.snackBar.open('Your data was successfully saved.', 'Close', { duration: 3000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition });
      }
   }

   async onSubmitPassword() {
      const userDataPasswordString = localStorage.getItem('userData');

      if (await this.validationPassword()) {

         const formData = {
            email: JSON.parse(localStorage.getItem('userData')!).email,
            newPassword: this.formDataPassword.newPassword
         }

         this.http.post('http://localhost:3000/change', formData)
            .subscribe(response => {
               console.log('User changed password successfully');
               this.snackBar.open('You successfully change your password!', 'Close', { duration: 3000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition });

               if (userDataPasswordString) {
                  const userData = JSON.parse(userDataPasswordString);
                  userData.password = this.formDataPassword.newPassword;
                  const updatedUserDataString = JSON.stringify(userData);
                  localStorage.setItem('userData', updatedUserDataString);
               }
            }, error => {
               console.error('Error during registration', error);
            });
      }
   }
}