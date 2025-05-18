import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
   selector: 'pagination',
   templateUrl: './pagination.component.html',
   styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
   @Input() currentPage: number = 1;
   @Input() totalPages: number = 1;

   @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

   get pages(): number[] {
      const visiblePages: number[] = [];

      if (this.totalPages <= 5) {
         for (let i = 1; i <= this.totalPages; i++) {
            visiblePages.push(i);
         }
      } else {
         if (this.currentPage > 3) {
            visiblePages.push(-1);
         }

         if (this.currentPage < this.totalPages && this.currentPage != 1) {
            visiblePages.push(this.currentPage - 1, this.currentPage, this.currentPage + 1);
            if (this.currentPage < this.totalPages - 2) visiblePages.push(-1);
         } else if (this.currentPage == this.totalPages) visiblePages.push(this.currentPage - 2, this.currentPage - 1, this.currentPage);
         else if (this.currentPage == 1) visiblePages.push(this.currentPage, this.currentPage + 1, this.currentPage + 2);

      }
      return visiblePages;
   }

   selectPage(page: number) {
      if (page !== -1) {
         this.pageChange.emit(page);
      }
   }
}