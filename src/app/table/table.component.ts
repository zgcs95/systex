import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Member, datas } from '../member';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @ViewChild(MatTable)
  table!: MatTable<Member>;
  index!: number
  EditYes: boolean = false;
  AddYes: boolean = false;
  dataSource!: MatTableDataSource<Member>
  displaySequence: string[] = ["userName", "country", "salary", "email", "actions"]

  filterValue!: string;

  add() {
    this.EditYes = false;
    this.AddYes = true;
  }

  remove(index: number) {
    this.dataService.deleteData(index);
    this.table.renderRows();
    this.dataSource.filter = (this.filterValue || '').trim().toLowerCase();
  }

  edit(index: number) {
    this.AddYes = false;
    this.EditYes = true;
    this.index = index;
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    
  }

  getTotal() {
    return this.dataSource.filteredData.map(t => t.salary).reduce((acc, value) => acc + value, 0);
  }
  
  addItem(newItem: Member) {
    if (this.EditYes==true) {
      this.dataService.putData(this.index, newItem);
      this.table.renderRows();
    } else if (this.AddYes==true) {
      this.dataService.postData(newItem);
      this.table.renderRows();
    }
    this.close()
  }
  close() {
    this.EditYes=false;
    this.AddYes=false;
  }

  constructor(private dataService: DataService) {
    
  }
  
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Member>(datas)
    this.dataService.getData();
  }

  onButtonClicked(): void {
    console.log('Button clicked in child component, calling function in parent component.');
    this.close()
  }
  
}