import { Component, ViewChild } from '@angular/core';
import { Member, datas } from '../member';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';
import { AsyncCustomValidator } from '../async-custom-validator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @ViewChild(MatTable)
  table!: MatTable<Member>;


  @ViewChild(MatSort) sort!: MatSort;


  index!: number
  EditYes: boolean = false;
  AddYes: boolean = false;
  realData!: MatTableDataSource<Member>
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
  // remove(index: number) {
  //   if (index == this.index && this.EditYes) {
  //     this.EditYes = false;
  //   }
  //   const target = this.dataService.findIndex(index)
  //   this.dataService.deleteData(target);
  //   if (this.keyword!=undefined) {
  //     this.dataService.filterDataByName(this.filterValue);
  //   } 

  //   this.index = this.index - 1;
  //   this.table.renderRows();
  //   this.dataSource.sort = this.sort;
  // }

  remove(email: string) {
    this.close();
    // if (index == this.index && this.EditYes) {
    //   this.EditYes = false;
    // }
    const target = this.dataService.findIndexbyemail(email)
    this.dataService.deleteData(target);
    if (this.keyword!=undefined) {
      this.dataService.filterDataByName(this.filterValue);
    } 

    this.index = this.index - 1;
    this.table.renderRows();
    this.dataSource.sort = this.sort;
  }


  // 修改資料
  // edit(index: number) {
  //   this.AddYes = false;
  //   this.EditYes = true;
  //   this.index = index;
  // }

  edit(email: string) {
    this.AddYes = false;
    this.EditYes = true;
    this.index = this.dataService.findIndexbyemail2(email);
  }

  
  
  
  // 過濾資料
  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataService.filterDataByName(this.filterValue);
    this.keyword = this.filterValue

    this.dataSource.sort = this.sort;
    this.AddYes = false;
    this.EditYes = false;
    
  }

  // 計算Total
  getTotal() {
    return this.dataSource.filteredData.map(t => t.salary).reduce((acc, value) => acc + value, 0);
  }
  
  
  addItem(newItem: Member) {
    // 編輯
    if (this.EditYes==true) {
      const target = this.dataService.findIndex(this.index)
      this.dataService.putData(target, newItem);
      if (this.keyword!=undefined) {
        this.dataService.filterDataByName(this.filterValue);
      } 
      this.table.renderRows();
      this.dataSource.sort = this.sort;
    } 
    // 新增
    if (this.AddYes==true) {
      this.dataService.postData(newItem);
      if (this.keyword!=undefined) {
        this.dataService.filterDataByName(this.filterValue);
      }
      this.table.renderRows();

      this.dataSource.sort = this.sort;
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

    this.dataService.dataSource$.subscribe(dataSource => {
      this.realData = dataSource
    });
    
    this.sourcenum = this.dataSource.data.length
  }

  // 更新資料
  ngDoCheck(): void {
    this.sourcenum = this.dataSource.data.length
    // const newEmails = this.dataSource.data.map(obj => obj.email);
    // if (this.EditYes) {
    //   const filterednewEmails = newEmails.filter(email => email !== this.dataSource.data[this.index].email);
    //   AsyncCustomValidator.setEmails(filterednewEmails);
    // } else {
    //   AsyncCustomValidator.setEmails(newEmails);
    // }
    this.dataSource.sort = this.sort;

    const newEmails = this.realData.data.map(obj => obj.email);
    if (this.EditYes) {
      // const filterednewEmails = newEmails.filter(email => email !== this.realData.data[this.index].email);
      const filterednewEmails = newEmails.filter(email => email !== this.realData.data[this.dataService.findIndex(this.index)].email);
      AsyncCustomValidator.setEmails(filterednewEmails);
    } else {
      AsyncCustomValidator.setEmails(newEmails);
    }

  }

  onButtonClicked(): void {
    this.close()
  }
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  // print(email: string) {
  //   console.log(this.dataService.findIndexbyemail(email))
  // }
}