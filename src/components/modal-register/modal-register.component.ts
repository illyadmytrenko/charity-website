import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.css']
})

export class ModalRegisterComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private dialogRef: MatDialogRef<ModalRegisterComponent>,
    private snackBar: MatSnackBar) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  formData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userActive: false
  };

  nicknameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_\-]+$/;
  emailRegex = /^[0-9a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;

  validation(): boolean {
    let usernameError = document.getElementById('username_error');
    let emailError = document.getElementById('email_error');
    let passwordError = document.getElementById('password_error');
    let confirmError = document.getElementById('confirm_error');

    if (this.formData.username.length < 5 && usernameError) {
      usernameError.innerText = 'Required a not empty username.';
      return false;
    } else if (usernameError) {
      usernameError.innerText = '';
    }

    if (!this.nicknameRegex.test(this.formData.username) && usernameError) {
      usernameError.innerText = 'Required a valid username.';
      return false;
    } else if (usernameError) {
      usernameError.innerText = '';
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

    if ((this.formData.password.length < 8 || this.formData.password.length > 20) && passwordError) {
      passwordError.innerText = 'Required a password between 8 and 20 characters.';
      return false;
    } else if (passwordError) {
      passwordError.innerText = '';
    }

    if (this.formData.password != this.formData.confirmPassword && confirmError) {
      confirmError.innerText = 'Password do not match.';
      return false;
    } else if (confirmError) {
      confirmError.innerText = '';
    }

    return true;
  }

  onSubmit() {
    let emailError = document.getElementById('email_error');

    let account = document.getElementById('account');
    let login = document.getElementById('login');
    let register = document.getElementById('register');

    let settings = document.getElementById('settings-footer');
    let donationHistory = document.getElementById('donationHistory-footer');
    let loginFooter = document.getElementById('login-footer');
    let registerFooter = document.getElementById('register-footer');


    if (this.validation()) {
      this.http.post('http://localhost:3000/register', this.formData)
        .subscribe(response => {
          console.log('User registered successfully');
          this.snackBar.open('Registration is successful!', 'Close', { duration: 3000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition });
          this.dialogRef.close();


          this.formData.userActive = true;
          localStorage.setItem('userData', JSON.stringify({ email: this.formData.email, userActive: this.formData.userActive, username: this.formData.username }));

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
          console.error('Error during registration', error);
          if (error.error.error == 'User with this email already exists.' && emailError) emailError.innerText = error.error.error;
        });
    }
  }
}
