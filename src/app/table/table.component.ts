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
  FormYes: boolean = false;
  EditYes: boolean = false;
  dataSource!: MatTableDataSource<Member>
  displaySequence: string[] = ["userName", "country", "salary", "email", "actions"]
  add() {
    this.FormYes = true;
  }

  remove(index: number) {
    this.dataSource = this.dataService.deleteData(index);
    this.table.renderRows();
  }
  edit(index: number) {
    this.EditYes = true;
    this.index = index;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getTotal() {
    return this.dataSource.data.map(t => t.salary).reduce((acc, value) => acc + value, 0);
  }
  
  close(newItem: boolean) {
    this.FormYes = newItem
  }

  addItem(newItem: Member) {
    if (this.EditYes==true) {
      this.dataSource = this.dataService.putData(this.index, newItem);
      this.table.renderRows();
    } else if (this.FormYes==true) {
      this.dataSource.data.push(newItem);
    this.table.renderRows();
    }
    this.EditYes=false;
    this.FormYes=false;
  }

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataSource = this.dataService.getData();
  }
  
}
