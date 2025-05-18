import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { DonationService } from '../services/donate.service';


@Component({
   selector: 'donate-page',
   templateUrl: './donate-page.component.html',
   styleUrls: ['./donate-page.component.css']
})
export class DonatePageComponent {
   constructor(private route: ActivatedRoute, private http: HttpClient, private donationService: DonationService) { }

   title = "Causes";
   way = "Home > Causes > Donate Now";

   desc = 'We need your powerful hands to change the world';
   imagePath = '../assets/donate4.png';

   formData = {
      sum: '',
      option: 'Choose payment method',
      fullName: '',
      email: '',
   };

   emailRegex = /^[0-9a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;

   ngOnInit() {
      this.route.queryParams.subscribe(params => {
         if (params['amount'] != undefined) this.formData.sum = params['amount'].toString();
         if (params['donationInfo'] != undefined) this.desc = params['donationInfo'].toString();
         if (params['imagePath'] != undefined) this.imagePath = params['imagePath'].toString();
      });
   }

   onInputChange(event: any) {
      let inputValue = event.target.value;
      inputValue = inputValue.replace(/-/g, '');
      if (inputValue.charAt(0) === '-') {
         inputValue = inputValue.slice(1);
      }
      this.formData.sum = inputValue;
   }

   validation(): boolean {
      let sumError = document.getElementById('sum_donate_error');
      let selectError = document.getElementById('select_donate_error');
      let emailError = document.getElementById('email_donate_error');

      if (+this.formData.sum < 5 && sumError) {
         sumError.innerText = 'Minimum Donation is $5';
         return false;
      } else if (sumError) {
         sumError.innerText = '';
      }

      if (this.formData.option == 'Choose payment method' && selectError) {
         selectError.innerText = 'Choose payment method.';
         return false;
      } else if (selectError) {
         selectError.innerText = '';
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

      return true;
   }

   onSubmit() {
      if (this.validation()) {
         Swal.fire({
            title: `<span style="color: #289113; font-family: Montserrat; font-weight: 600; font-size: 24px;">New donation</span>`,
            icon: "info",
            html: `
               <div style="font-family: Montserrat; font-weight: 600">
                  <div style="margin-bottom: 10px">Sum of your donation:<span style="color: #3A40D8; margin-left: 5px;">${this.formData.sum}$</span></br></div>
                  <div style="margin-bottom: 10px">Your email:<span style="color: #3A40D8; margin-left: 5px;">${this.formData.email}</span></div>
                  <p style="color: #289113;">We will send confirmation of your donation to this email address.</p>
               </div>
            `,
            showCloseButton: true,
            confirmButtonText: `
               <i class="fa fa-heart"></i> Donate!
            `,
         });

         // this.donationService.setToGo(+this.formData.sum);

         function getCurrentDateTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Додаємо 1 до місяця, так як він починається з 0
            const day = now.getDate().toString().padStart(2, '0');
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');

            const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}`;
            return dateTimeString;
         }

         const userDataString = localStorage.getItem('userData');

         if (userDataString) {
            const userData = JSON.parse(userDataString);
            let username = userData.email;

            if (this.formData.fullName != "") username = this.formData.fullName;

            const data = {
               username: username,
               amount: this.formData.sum,
               emailFrom: userData.email,
               emailTo: this.formData.email,
               donationTitle: this.desc,
               donationTime: getCurrentDateTime(),
               imagePath: this.imagePath,
            }

            this.http.post('http://localhost:3000/donate', data)
               .subscribe(response => {
                  console.log('User donated successfully');
               });
         } else console.log('Дані користувача не знайдено в локальному сховищі');
      }
   }
}