import { Component } from '@angular/core';
import { perfumedatas } from '../member';

@Component({
  selector: 'app-bottle',
  templateUrl: './bottle.component.html',
  styleUrls: ['./bottle.component.css']
})
export class BottleComponent {
  header = perfumedatas[4].headers[0];
  content = perfumedatas[4].content[0];
  imageUrl = perfumedatas[4].imageUrl
  contents = perfumedatas[4].content[1]

}
