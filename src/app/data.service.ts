
import { Injectable } from '@angular/core';
import { Member, datas } from './member';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSource = new BehaviorSubject<MatTableDataSource<Member>>(new MatTableDataSource<Member>(datas));
  dataSource$ = this.dataSource.asObservable();

  private mockData = new BehaviorSubject<MatTableDataSource<Member>>(new MatTableDataSource<Member>(datas));
  mockData$ = this.mockData.asObservable();

  constructor() { }

  getData(): Observable<MatTableDataSource<Member>> {
    return this.dataSource$;
  }

  // 刪除資料
  deleteData(index: number): void {
    const currentData = this.dataSource.getValue().data;
    if (index == 0) {
      currentData.splice(0, 1);
    } else if (index == currentData.length - 1) {
      currentData.splice(index, 1);
    } else {
      currentData.splice(index, 1);
    }
    this.dataSource.next(new MatTableDataSource<Member>(currentData));
    this.mockData.next(new MatTableDataSource<Member>(currentData));
  }

  // 修改資料
  putData(index: number, member: Member) {
    const currentData = this.dataSource.getValue().data;
    currentData[index] = member;
    this.dataSource.next(new MatTableDataSource<Member>(currentData));
    this.mockData.next(new MatTableDataSource<Member>(currentData));
  }

  // 新增資料
  postData(member: Member): void {
    const currentData = this.dataSource.getValue().data;
    currentData.push(member);
    this.dataSource.next(new MatTableDataSource<Member>(currentData));
    this.mockData.next(new MatTableDataSource<Member>(currentData));
  }
  
  // 過濾資料
  filterDataByName(name: string): void {
    this.dataSource$.pipe(take(1)).subscribe(dataSource => {
        const filteredData = dataSource.data.filter(member =>
            member.userName.toLowerCase().includes(name.toLowerCase())
        );
        this.mockData.next(new MatTableDataSource<Member>(filteredData));
    });
}

  // 找對應資料
  findIndex(index: number): number {
    const mockData = this.mockData.getValue();
    const emailToFind = mockData.data[index].email;
    if (!emailToFind) {
      console.log("no email")
      // will return -1 in no found
    }
    const dataSource = this.dataSource.getValue();
    return dataSource.data.findIndex(item => item.email === emailToFind);
  }

  // 找對應資料 (刪除用的)
  findIndexbyemail(email: string): number {
    const dataSource = this.dataSource.getValue();
    return dataSource.data.findIndex(item => item.email === email);
  }

  // 找對應資料 (編輯用的)
  findIndexbyemail2(email: string): number {
    const dataSource = this.mockData.getValue();
    return dataSource.data.findIndex(item => item.email === email);
  }
}

