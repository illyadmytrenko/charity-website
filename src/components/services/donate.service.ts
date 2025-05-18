import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class DonationService {
   private donation = new BehaviorSubject<number>(0);
   donation$ = this.donation.asObservable();

   setToGo(value: number) {
      this.donation.next(value);
   }
}