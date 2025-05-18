import { Component } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';
import { DonationService } from '../services/donate.service';

@Component({
   selector: 'causes',
   templateUrl: './causes.component.html',
   styleUrls: ['./causes.component.css']
})
export class CausesComponent {
   title = "Causes";
   way = "Home > Causes";

   constructor(private donationService: DonationService) { }

   currentPage: number = 1;
   totalPages!: number;
   itemsPerPage: number = 9;
   displayedData: any[] = [];

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
      ["../assets/donate4.png", "$4000", "$3220", "Children Education Needs For Change The World.", "Andrew"],
      ["../assets/donate1.png", "$3000", "$2500", "Needs For Change The World.", "Andrew"],
      ["../assets/donate2.png", "$5000", "$2000", "Old Education Needs For All.", "Andrew"],
      ["../assets/donate3.png", "$4000", "$1000", "Old Education Needs For All.", "Hank"],
      ["../assets/donate4.png", "$2500", "$1500", "Needs For Change The World.", "Hank"],
      ["../assets/donate1.png", "$7500", "$2500", "Children Education Needs For Change The World.", "Hank"],
      ["../assets/donate3.png", "$4000", "$3000", "Needs For Change The World.", "Mary"],
      ["../assets/donate2.png", "$6000", "$5500", "Old Education Needs For All.", "Mary"],
      ["../assets/donate4.png", "$7500", "$5500", "Children Education Needs For Change The World..", "Mary"],
      ["../assets/donate1.png", "$4000", "$3220", "Children Education Needs For Change The World.", "Adam"],
      ["../assets/donate2.png", "$3000", "$2500", "Old Education Needs For All.", "Adam"],
      ["../assets/donate3.png", "$5000", "$2000", "Needs For Change The World.", "Adam"],
      ["../assets/donate2.png", "$4000", "$1000", "Old Education Needs For All.", "Gustavo"],
      ["../assets/donate3.png", "$2500", "$1000", "Needs For Change The World.", "Gustavo"],
      ["../assets/donate1.png", "$7000", "$5000", "Children Education Needs For Change The World.", "Gustavo"],
      ["../assets/donate3.png", "$3500", "$3000", "Needs For Change The World.", "Michael"],
      ["../assets/donate1.png", "$2500", "$1000", "Children Education Needs For Change The World.", "Michael"],
      ["../assets/donate2.png", "$5000", "$2000", "Old Education Needs For All.", "Michael"],
      ["../assets/donate4.png", "$4000", "$3220", "Children Education Needs For Change The World.", "Andrew"],
      ["../assets/donate1.png", "$3000", "$2500", "Needs For Change The World.", "Andrew"],
      ["../assets/donate2.png", "$5000", "$2000", "Old Education Needs For All.", "Andrew"],
      ["../assets/donate3.png", "$4000", "$1000", "Old Education Needs For All.", "Hank"],
      ["../assets/donate4.png", "$2500", "$1500", "Needs For Change The World.", "Hank"],
      ["../assets/donate1.png", "$7500", "$2500", "Children Education Needs For Change The World.", "Hank"],
      ["../assets/donate3.png", "$4000", "$3000", "Needs For Change The World.", "Mary"],
      ["../assets/donate2.png", "$6000", "$5500", "Old Education Needs For All.", "Mary"],
      ["../assets/donate4.png", "$7500", "$5500", "Children Education Needs For Change The World..", "Mary"],
      ["../assets/donate1.png", "$4000", "$3220", "Children Education Needs For Change The World.", "Adam"],
      ["../assets/donate2.png", "$3000", "$2500", "Old Education Needs For All.", "Adam"],
      ["../assets/donate3.png", "$5000", "$2000", "Needs For Change The World.", "Adam"],
      ["../assets/donate2.png", "$4000", "$1000", "Old Education Needs For All.", "Gustavo"],
      ["../assets/donate3.png", "$2500", "$1000", "Needs For Change The World.", "Gustavo"],
      ["../assets/donate1.png", "$7000", "$5000", "Children Education Needs For Change The World.", "Gustavo"],
      ["../assets/donate3.png", "$3500", "$3000", "Needs For Change The World.", "Michael"],
      ["../assets/donate1.png", "$2500", "$1000", "Children Education Needs For Change The World.", "Michael"],
      ["../assets/donate2.png", "$5000", "$2000", "Old Education Needs For All.", "Michael"],
      ["../assets/donate4.png", "$4000", "$3220", "Children Education Needs For Change The World.", "Andrew"],
      ["../assets/donate1.png", "$3000", "$2500", "Needs For Change The World.", "Andrew"],
      ["../assets/donate2.png", "$5000", "$2000", "Old Education Needs For All.", "Andrew"],
      ["../assets/donate3.png", "$4000", "$1000", "Old Education Needs For All.", "Hank"],
      ["../assets/donate4.png", "$2500", "$1500", "Needs For Change The World.", "Hank"],
      ["../assets/donate1.png", "$7500", "$2500", "Children Education Needs For Change The World.", "Hank"],
      ["../assets/donate3.png", "$4000", "$3000", "Needs For Change The World.", "Mary"],
      ["../assets/donate2.png", "$6000", "$5500", "Old Education Needs For All.", "Mary"],
      ["../assets/donate4.png", "$7500", "$5500", "Children Education Needs For Change The World..", "Mary"],
      ["../assets/donate1.png", "$4000", "$3220", "Children Education Needs For Change The World.", "Adam"],
      ["../assets/donate2.png", "$3000", "$2500", "Old Education Needs For All.", "Adam"],
      ["../assets/donate3.png", "$5000", "$2000", "Needs For Change The World.", "Adam"],
      ["../assets/donate2.png", "$4000", "$1000", "Old Education Needs For All.", "Gustavo"],
      ["../assets/donate3.png", "$2500", "$1000", "Needs For Change The World.", "Gustavo"],
      ["../assets/donate1.png", "$7000", "$5000", "Children Education Needs For Change The World.", "Gustavo"],
      ["../assets/donate3.png", "$3500", "$3000", "Needs For Change The World.", "Michael"],
      ["../assets/donate1.png", "$2500", "$1000", "Children Education Needs For Change The World.", "Michael"],
      ["../assets/donate2.png", "$5000", "$2000", "Old Education Needs For All.", "Michael"],
      ["../assets/donate4.png", "$4000", "$3220", "Children Education Needs For Change The World.", "Andrew"],
      ["../assets/donate1.png", "$3000", "$2500", "Needs For Change The World.", "Andrew"],
      ["../assets/donate2.png", "$5000", "$2000", "Old Education Needs For All.", "Andrew"],
      ["../assets/donate3.png", "$4000", "$1000", "Old Education Needs For All.", "Hank"],
      ["../assets/donate4.png", "$2500", "$1500", "Needs For Change The World.", "Hank"],
      ["../assets/donate1.png", "$7500", "$2500", "Children Education Needs For Change The World.", "Hank"],
      ["../assets/donate3.png", "$4000", "$3000", "Needs For Change The World.", "Mary"],
      ["../assets/donate2.png", "$6000", "$5500", "Old Education Needs For All.", "Mary"],
      ["../assets/donate4.png", "$7500", "$5500", "Children Education Needs For Change The World..", "Mary"]
   ]

   ngOnInit(): void {
      this.totalPages = this.data.length / this.itemsPerPage;
      this.updateDisplayedData();

      // this.donationService.donation$.subscribe(value => {
      //    this.displayedData[1][3] = this.displayedData[1][3] + value;
      //    console.log(value);
      // });
   }

   onPageChange(page: number): void {
      this.currentPage = page;
      this.updateDisplayedData();
   }

   updateDisplayedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.displayedData = this.data.slice(startIndex, endIndex);
   }
}