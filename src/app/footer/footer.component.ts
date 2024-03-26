import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  onButtonClick(event: MouseEvent): void {
    event.preventDefault();
    // You can add any other custom logic here
  }
}


