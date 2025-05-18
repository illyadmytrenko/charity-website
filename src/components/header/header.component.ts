import { Component } from '@angular/core';
import { ActiveLinkService } from 'src/components/services/active-link.service';
import { Router } from '@angular/router';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.css']
})
export class HeaderComponent {
   constructor(public activeLinkService: ActiveLinkService, private router: Router, public dialog: MatDialog,
      private snackBar: MatSnackBar) { }

   isActiveOne: boolean = false;
   isMenuOpen: boolean | undefined;

   userData = undefined;

   isDropdownVisible = false;

   horizontalPosition: MatSnackBarHorizontalPosition = 'center';
   verticalPosition: MatSnackBarVerticalPosition = 'top';

   ngOnInit() {
      let account = document.getElementById('account');
      let login = document.getElementById('login');
      let register = document.getElementById('register');

      const storedUserData = localStorage.getItem('userData');

      if (storedUserData) {
         const userData = JSON.parse(storedUserData);

         if (userData.userActive && account) {
            account.classList.add('active');
            account.classList.remove('d-none');
         }

         if (userData.userActive && login) login.classList.add('d-none');
         if (userData.userActive && register) register.classList.add('d-none');
      }
   }

   setActiveLink(id: string): void {
      this.activeLinkService.setActiveLinkId(id);
   }

   closeMenu() {
      if (this.isMenuOpen == true) this.isMenuOpen = false;
      this.isActiveOne = false;
   }

   toggleActiveOne() {
      this.isActiveOne = !this.isActiveOne;
      this.isMenuOpen = !this.isMenuOpen;
   }

   goToOtherPage(path: string) {
      this.router.navigate([path]);
   }

   openModalRegister() {
      const dialogRef = this.dialog.open(ModalRegisterComponent, {
         width: '400px',
      });
   }

   openModalLogin() {
      const dialogRef = this.dialog.open(ModalLoginComponent, {
         width: '400px',
      });
   }

   showDropdown() {
      this.isDropdownVisible = true;
   }

   hideDropdown() {
      this.isDropdownVisible = false;
   }

   logOut() {
      let account = document.getElementById('account');
      let login = document.getElementById('login');
      let register = document.getElementById('register');

      let settings = document.getElementById('settings-footer');
      let donationHistory = document.getElementById('donationHistory-footer');
      let loginFooter = document.getElementById('login-footer');
      let registerFooter = document.getElementById('register-footer');

      localStorage.clear();

      if (account) {
         account.classList.add('d-none');
         account.classList.remove('active');
      }

      if (settings) {
         settings.classList.add('d-none');
      }

      if (donationHistory) {
         donationHistory.classList.add('d-none');
      }

      if (login) login.classList.remove('d-none');
      if (register) register.classList.remove('d-none');

      if (loginFooter) loginFooter.classList.remove('d-none');
      if (registerFooter) registerFooter.classList.remove('d-none');

      this.goToOtherPage('/home');

      this.snackBar.open('Logout is successful!', 'Close', { duration: 3000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition });
   }
}