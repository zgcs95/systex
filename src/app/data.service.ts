
import { Injectable } from '@angular/core';
import { Member, datas } from './member';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSource = new BehaviorSubject<MatTableDataSource<Member>>(new MatTableDataSource<Member>(datas));
  dataSource$ = this.dataSource.asObservable();

  constructor() { }

  getData(): Observable<MatTableDataSource<Member>> {
    return this.dataSource$;
  }

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
  }

  putData(index: number, member: Member) {
    const currentData = this.dataSource.getValue().data;
    currentData[index] = member;
    this.dataSource.next(new MatTableDataSource<Member>(currentData));
  }

  postData(member: Member): void {
    const currentData = this.dataSource.getValue().data;
    currentData.push(member);
    this.dataSource.next(new MatTableDataSource<Member>(currentData));
  }
}

