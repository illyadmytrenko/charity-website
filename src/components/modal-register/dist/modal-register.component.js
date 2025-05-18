"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ModalRegisterComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var ModalRegisterComponent = /** @class */ (function () {
    function ModalRegisterComponent(data, http, dialogRef, snackBar) {
        this.data = data;
        this.http = http;
        this.dialogRef = dialogRef;
        this.snackBar = snackBar;
        this.horizontalPosition = 'center';
        this.verticalPosition = 'top';
        this.formData = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            userActive: false
        };
        this.nicknameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_\-]+$/;
        this.emailRegex = /^[0-9a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    }
    ModalRegisterComponent.prototype.validation = function () {
        var usernameError = document.getElementById('username_error');
        var emailError = document.getElementById('email_error');
        var passwordError = document.getElementById('password_error');
        var confirmError = document.getElementById('confirm_error');
        if (this.formData.username.length < 5 && usernameError) {
            usernameError.innerText = 'Required a not empty username.';
            return false;
        }
        else if (usernameError) {
            usernameError.innerText = '';
        }
        if (!this.nicknameRegex.test(this.formData.username) && usernameError) {
            usernameError.innerText = 'Required a valid username.';
            return false;
        }
        else if (usernameError) {
            usernameError.innerText = '';
        }
        if (this.formData.email.length < 5 && emailError) {
            emailError.innerText = 'Required a not empty email.';
            return false;
        }
        else if (emailError) {
            emailError.innerText = '';
        }
        if (!this.emailRegex.test(this.formData.email) && emailError) {
            emailError.innerText = 'Required a valid email.';
            return false;
        }
        else if (emailError) {
            emailError.innerText = '';
        }
        if ((this.formData.password.length < 8 || this.formData.password.length > 20) && passwordError) {
            passwordError.innerText = 'Required a password between 8 and 20 characters.';
            return false;
        }
        else if (passwordError) {
            passwordError.innerText = '';
        }
        if (this.formData.password != this.formData.confirmPassword && confirmError) {
            confirmError.innerText = 'Password do not match.';
            return false;
        }
        else if (confirmError) {
            confirmError.innerText = '';
        }
        return true;
    };
    ModalRegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        var emailError = document.getElementById('email_error');
        var account = document.getElementById('account');
        var login = document.getElementById('login');
        var register = document.getElementById('register');
        var settings = document.getElementById('settings-footer');
        var donationHistory = document.getElementById('donationHistory-footer');
        var loginFooter = document.getElementById('login-footer');
        var registerFooter = document.getElementById('register-footer');
        if (this.validation()) {
            this.http.post('http://localhost:3000/register', this.formData)
                .subscribe(function (response) {
                console.log('User registered successfully');
                _this.snackBar.open('Registration is successful!', 'Close', { duration: 3000, horizontalPosition: _this.horizontalPosition, verticalPosition: _this.verticalPosition });
                _this.dialogRef.close();
                _this.formData.userActive = true;
                localStorage.setItem('userData', JSON.stringify({ email: _this.formData.email, userActive: _this.formData.userActive, username: _this.formData.username }));
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
                if (login)
                    login.classList.add('d-none');
                if (register)
                    register.classList.add('d-none');
                if (loginFooter)
                    loginFooter.classList.add('d-none');
                if (registerFooter)
                    registerFooter.classList.add('d-none');
            }, function (error) {
                console.error('Error during registration', error);
                if (error.error.error == 'User with this email already exists.' && emailError)
                    emailError.innerText = error.error.error;
            });
        }
    };
    ModalRegisterComponent = __decorate([
        core_1.Component({
            selector: 'modal-register',
            templateUrl: './modal-register.component.html',
            styleUrls: ['./modal-register.component.css']
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ModalRegisterComponent);
    return ModalRegisterComponent;
}());
exports.ModalRegisterComponent = ModalRegisterComponent;
