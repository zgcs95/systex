import { Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { perfumedatas } from '../member';


@Component({
  selector: 'app-perfume',
  templateUrl: './perfume.component.html',
  styleUrls: ['./perfume.component.css']
})
export class PerfumeComponent {
  perfumedatas = perfumedatas;
  right = 'right';
  left = 'left'
}
