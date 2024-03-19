import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {path: 'table', component: TableComponent, title:"CRUD Table"},
  {path: 'form', component: AddComponent, title:"Add"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
