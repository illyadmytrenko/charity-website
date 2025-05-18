import { Component } from '@angular/core';
import { ActiveLinkService } from 'src/components/services/active-link.service';
import { Router } from '@angular/router';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalLoginComponent } from '../modal-login/modal-login.component';

interface Item {
   imageSrc: string;
   imageAlt: string;
}

@Component({
   selector: 'app-footer',
   templateUrl: './footer.component.html',
   styleUrls: ['./footer.component.css']
})

export class FooterComponent {
   constructor(public activeLinkService: ActiveLinkService, private router: Router, public dialog: MatDialog) { }

   ngOnInit() {
      let settings = document.getElementById('settings-footer');
      let donationHistory = document.getElementById('donationHistory-footer');
      let loginFooter = document.getElementById('login-footer');
      let registerFooter = document.getElementById('register-footer');

      const storedUserData = localStorage.getItem('userData');

      if (storedUserData) {
         const userData = JSON.parse(storedUserData);

         if (userData.userActive && settings) {
            settings.classList.remove('d-none');
         }

         if (userData.userActive && donationHistory) {
            donationHistory.classList.remove('d-none');
         }

         if (userData.userActive && loginFooter) loginFooter.classList.add('d-none');
         if (userData.userActive && registerFooter) registerFooter.classList.add('d-none');
      }
   }

   setActiveLink(id: string): void {
      this.activeLinkService.setActiveLinkId(id);
   }

   goToOtherPage(path: string) {
      this.router.navigate([path]);
      window.scrollTo(0, 0);
   }

   data: Item[] = [
      {
         imageSrc: "../../assets/big-footer1.png",
         imageAlt: "kids image1",
      },
      {
         imageSrc: "../../assets/big-footer2.png",
         imageAlt: "kids image2"
      },
      {
         imageSrc: "../../assets/big-footer3.png",
         imageAlt: "kids image3"
      },
      {
         imageSrc: "../../assets/big-footer4.png",
         imageAlt: "kids image4"
      },
      {
         imageSrc: "../../assets/big-footer5.png",
         imageAlt: "kids image5"
      },
      {
         imageSrc: "../../assets/big-footer6.png",
         imageAlt: "kids image6"
      }
   ];

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
}