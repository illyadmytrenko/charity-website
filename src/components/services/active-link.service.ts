import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class ActiveLinkService {
   private activeLinkId: string | null = null;

   setActiveLinkId(id: string | null): void {
      this.activeLinkId = id;
   }

   getActiveLinkId(): string | null {
      return this.activeLinkId;
   }
}