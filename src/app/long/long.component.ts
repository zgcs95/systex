import { Component } from '@angular/core';
import { perfumedatas } from '../member';

@Component({
  selector: 'app-long',
  templateUrl: './long.component.html',
  styleUrls: ['./long.component.css']
})
export class LongComponent {
  perfumedatas = perfumedatas
}
