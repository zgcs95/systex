import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-middle',
  templateUrl: './middle.component.html',
  styleUrls: ['./middle.component.css']
})
export class MiddleComponent {
  @Input() header!: string;
  @Input() content!: string;
  @Input() imageUrl!: string;
  @Input() imagepos!: string;
}