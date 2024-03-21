import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { AddComponent } from './add/add.component';
import { PerfumeComponent } from './perfume/perfume.component';

export const routes: Routes = [
  {path: 'table', component: TableComponent, title:"CRUD Table"},
  {path: 'perfume', component: PerfumeComponent, title:"Perfume"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
