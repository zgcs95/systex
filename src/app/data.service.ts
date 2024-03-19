import { Injectable } from '@angular/core';
import { Member, datas } from './member';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  // private _dataSource: BehaviorSubject<Member[]> = new BehaviorSubject<Member[]>(datas);
  // public readonly dataSource$: Observable<Member[]> = this._dataSource.asObservable();

  private dataSource = new MatTableDataSource<Member>(datas);
  getData(): MatTableDataSource<Member> {
    console.log(this.dataSource)
    return this.dataSource;
  }

  deleteData(index: number): MatTableDataSource<Member> {
    if (index == 0) {
      this.dataSource.data = this.dataSource.data.slice(1, this.dataSource.data.length)
    } else if (index == this.dataSource.data.length-1) {
      this.dataSource.data = this.dataSource.data.slice(0, this.dataSource.data.length-1)
    } else {
      this.dataSource.data = this.dataSource.data.slice(0, index).concat(this.dataSource.data.slice(index+1, this.dataSource.data.length))
    }
    return this.dataSource
  }

  putData(index: number, member: Member) {
    this.dataSource.data[index] = member;
    return this.dataSource
  }
}
