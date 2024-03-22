import { Component, ViewChild } from '@angular/core';
import { Member, datas } from '../member';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';
import { AsyncCustomValidator } from '../async-custom-validator';

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
  sourcenum!: number;
  emails!: string[];
  keyword!: string;

  // 新增資料
  add() {
    this.EditYes = false;
    this.AddYes = true;
  }

  // 刪除資料
  remove(index: number) {
    const target = this.dataService.findIndex(index)
    this.dataService.deleteData(target);
    if (this.keyword!=undefined) {
      this.dataService.filterDataByName(this.filterValue);
    } 
    this.table.renderRows();
  }

  // 修改資料
  edit(index: number) {
    this.AddYes = false;
    this.EditYes = true;
    this.index = index;
  }
  
  // 過濾資料
  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataService.filterDataByName(this.filterValue);
    this.keyword = this.filterValue
    
  }

  // 計算Total
  getTotal() {
    return this.dataSource.filteredData.map(t => t.salary).reduce((acc, value) => acc + value, 0);
  }
  
  // 新增
  addItem(newItem: Member) {
    if (this.EditYes==true) {
      const target = this.dataService.findIndex(this.index)
      this.dataService.putData(target, newItem);

      if (this.keyword!=undefined) {
        this.dataService.filterDataByName(this.filterValue);
      } 

      this.table.renderRows();

      
    } 
    if (this.AddYes==true) {
      this.dataService.postData(newItem);
      if (this.keyword!=undefined) {
        this.dataService.filterDataByName(this.filterValue);
      }
      this.table.renderRows();

    }
    this.close()
  }

  // 關閉表單
  close() {
    this.EditYes=false;
    this.AddYes=false;
  }

  constructor(private dataService: DataService) {
    
  }
  
  //訂閱
  ngOnInit(): void {
    this.dataService.mockData$.subscribe(mockData => {
      this.dataSource = mockData;
    });
    this.sourcenum = this.dataSource.data.length
  }

  // 更新資料
  ngDoCheck(): void {
    this.sourcenum = this.dataSource.data.length
    const newEmails = this.dataSource.data.map(obj => obj.email);
    if (this.EditYes) {
      const filterednewEmails = newEmails.filter(email => email !== this.dataSource.data[this.index].email);
      AsyncCustomValidator.setEmails(filterednewEmails);
    } else {
      AsyncCustomValidator.setEmails(newEmails);
    }
    
  }

  onButtonClicked(): void {
    this.close()
  }
  
}