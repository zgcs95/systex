import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Member, datas } from '../member';
import { MatTable, MatTableDataSource } from '@angular/material/table';

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
  datas: Member[] = datas
  dataSource = new MatTableDataSource(this.datas);
  displaySequence: string[] = ["userName", "country", "salary", "email", "actions"]
  add() {
    this.FormYes = true;
  }

  remove(index: number) {
    if (index == 0) {
      this.dataSource.data = this.dataSource.data.slice(1, this.dataSource.data.length)
    } else if (index == this.dataSource.data.length-1) {
      this.dataSource.data = this.dataSource.data.slice(0, this.dataSource.data.length-1)
    } else {
      this.dataSource.data = this.dataSource.data.slice(0, index).concat(this.dataSource.data.slice(index+1, this.dataSource.data.length))
    }
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
      this.dataSource.data[this.index] = newItem;
      this.table.renderRows();
    } else if (this.FormYes==true) {
      this.dataSource.data.push(newItem);
    this.table.renderRows();
    }
    this.EditYes=false;
    this.FormYes=false;
  }
  
}
