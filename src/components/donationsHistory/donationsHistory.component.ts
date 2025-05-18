import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { ActiveLinkService } from 'src/components/services/active-link.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
   selector: 'donationsHistory',
   templateUrl: './donationsHistory.component.html',
   styleUrls: ['./donationsHistory.component.css']
})
export class DonationHistoryComponent {
   constructor(public activeLinkService: ActiveLinkService, private router: Router, private http: HttpClient) { }
   title = 'Donations History';
   way = 'Home > My Account > Donation History';

   donations: any = [];

   setActiveLink(id: string): void {
      this.activeLinkService.setActiveLinkId(id);
   }

   goToOtherPage(path: string) {
      this.router.navigate([path]);
   }

   ngOnInit() {
      const storedUserData = localStorage.getItem('userData');
      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      let zeroDonate = document.getElementById('zero-donate')

      if (storedUserData) {
         const userData = JSON.parse(storedUserData);
         this.http.post('http://localhost:3000/showDonationHistory', { email: userData.email }, { headers: headers })
            .subscribe(response => {
               this.donations = response;
               console.log(this.donations.donations);
            });
      }
   }
}