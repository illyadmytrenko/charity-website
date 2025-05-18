import { Component } from '@angular/core';
import { ActiveLinkService } from 'src/components/services/active-link.service';

@Component({
   selector: 'faq',
   templateUrl: './faq.component.html',
   styleUrls: ['./faq.component.css']
})
export class FAQComponent {
   title = "Faq's";
   way = "Home > Faq's";

   constructor(public activeLinkService: ActiveLinkService) { }

   answerIndex: number | null = null;
   activeQuestions = "";

   ngOnInit() {
      this.setActiveLink('general_btn', 'generalQuestions');
   }

   setActiveLink(id: string, questions: string): void {
      this.activeLinkService.setActiveLinkId(id);
      this.activeQuestions = questions;
      if (this.answerIndex != null) this.toggleAnswer(this.answerIndex);
   }

   toggleAnswer(index: number) {
      if (this.answerIndex === index) {
         this.answerIndex = null;
      } else {
         this.answerIndex = index;
      }
   }
}