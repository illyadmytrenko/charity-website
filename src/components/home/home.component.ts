import { Component } from '@angular/core';
import { ActiveLinkService } from 'src/components/services/active-link.service';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import SwiperCore, { Swiper } from 'swiper'
import { MatDialog } from '@angular/material/dialog';
import { ModalLoginComponent } from '../modal-login/modal-login.component';

@Component({
   selector: 'home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.css']
})
export class HomeComponent {
   constructor(public activeLinkService: ActiveLinkService, private router: Router, public dialog: MatDialog) { }

   data = [
      ["../assets/donate1.png", "$4000", "$3220", "Children Education Needs For Change The World.", "Adam"],
      ["../assets/donate2.png", "$3000", "$2500", "Old Education Needs For All.", "Adam"],
      ["../assets/donate3.png", "$5000", "$2000", "Needs For Change The World.", "Adam"],
      ["../assets/donate2.png", "$4000", "$1000", "Old Education Needs For All.", "Gustavo"],
      ["../assets/donate3.png", "$2500", "$1000", "Needs For Change The World.", "Gustavo"],
      ["../assets/donate1.png", "$7000", "$5000", "Children Education Needs For Change The World.", "Gustavo"],
      ["../assets/donate3.png", "$3500", "$3000", "Needs For Change The World.", "Michael"],
      ["../assets/donate1.png", "$2500", "$1000", "Children Education Needs For Change The World.", "Michael"],
      ["../assets/donate2.png", "$5000", "$2000", "Old Education Needs For All.", "Michael"],
   ]

   setActiveLink(id: string): void {
      this.activeLinkService.setActiveLinkId(id);
   }

   goToOtherPage(path: string, amount?: number, donationInfo?: string) {
      const navigationExtras: NavigationExtras = {
         queryParams: {
            amount: amount,
            donationInfo: donationInfo,
         }
      };
      this.router.navigate([path], navigationExtras);
      window.scrollTo(0, 0);
   }

   handleDonateClick(amount?: number | undefined, donationInfo?: string) {
      const userData = localStorage.getItem('userData');
      if (!userData) this.openModalLogin();
      else {
         this.setActiveLink('causes');
         this.goToOtherPage('/donatePage', amount, donationInfo);
      }
   }

   openModalLogin() {
      const dialogRef = this.dialog.open(ModalLoginComponent, {
         width: '400px',
      });
   }
}; 