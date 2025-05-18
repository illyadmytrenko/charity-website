import { Component, Input } from '@angular/core';

@Component({
   selector: 'roadmap',
   templateUrl: './roadmap.component.html',
   styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent {
   @Input() title?: string;
   @Input() way?: string;
}; 