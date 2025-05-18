import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveLinkService } from 'src/components/services/active-link.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import { NavigationExtras } from '@angular/router';


@Component({
   selector: 'donation-card',
   templateUrl: './donation-card.component.html',
   styleUrls: ['./donation-card.component.css']
})
export class DonationCardComponent {
   constructor(private router: Router, public activeLinkService: ActiveLinkService, public dialog: MatDialog) { }

   @Input() data: any[] = [];
   donationInfo: any[] = [];

   ngOnInit(): void {
      this.donationInfo = this.data;
      if (typeof this.donationInfo[1] == 'string' && typeof this.donationInfo[2] == 'string')
         this.donationInfo.push(`$${+this.donationInfo[1].slice(1) - +this.donationInfo[2].slice(1)}`);
   }

   ngOnChanges() {
      this.donationInfo = this.data;
      if (typeof this.donationInfo[1] == 'string' && typeof this.donationInfo[2] == 'string')
         this.donationInfo.push(`$${+this.donationInfo[1].slice(1) - +this.donationInfo[2].slice(1)}`);
   }

   setActiveLink(id: string): void {
      this.activeLinkService.setActiveLinkId(id);
   }

   goToOtherPage(path: string, donationInfo?: string, imagePath?: string,) {
      const navigationExtras: NavigationExtras = {
         queryParams: {
            donationInfo: donationInfo,
            imagePath: imagePath
         }
      };
      this.router.navigate([path], navigationExtras).then(() => {
         window.scrollTo(0, 0);
      });
   }

   handleDonateClick() {
      console.log(+this.donationInfo[5].slice(1))
      if (+this.donationInfo[5].slice(1) > 0) {
         const userData = localStorage.getItem('userData');
         if (!userData) this.openModalLogin();
         else {
            this.setActiveLink('causes');
            this.goToOtherPage('/donatePage', this.donationInfo[3], this.donationInfo[0]);
         }
      }
   }

   openModalLogin() {
      const dialogRef = this.dialog.open(ModalLoginComponent, {
         width: '400px',
      });
   }
}