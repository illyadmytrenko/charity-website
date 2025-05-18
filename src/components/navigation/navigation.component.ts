import { Component } from '@angular/core';
import { ActiveLinkService } from 'src/components/services/active-link.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
   selector: 'navigation',
   templateUrl: './navigation.component.html',
   styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
   constructor(public activeLinkService: ActiveLinkService, private router: Router, private snackBar: MatSnackBar) { }

   horizontalPosition: MatSnackBarHorizontalPosition = 'center';
   verticalPosition: MatSnackBarVerticalPosition = 'top';

   setActiveLink(id: string): void {
      this.activeLinkService.setActiveLinkId(id);
   }

   goToOtherPage(path: string) {
      this.router.navigate([path]);
   }

   logOut() {
      let account = document.getElementById('account');
      let login = document.getElementById('login');
      let register = document.getElementById('register');

      localStorage.clear();

      if (account) {
         account.classList.add('d-none');
         account.classList.remove('active');
      }

      if (login) login.classList.remove('d-none');

      if (register) register.classList.remove('d-none');

      this.goToOtherPage('/home');

      this.snackBar.open('Logout is successful!', 'Close', { duration: 3000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition });
   }
}; 