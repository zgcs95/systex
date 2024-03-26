import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfumeComponent } from './perfume/perfume.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MiddleComponent } from './middle/middle.component';
import { FooterComponent } from './footer/footer.component';
import {MatCardModule} from '@angular/material/card';
import { CardComponent } from './card/card.component';
import {MatMenuModule} from '@angular/material/menu';
import { BarComponent } from './bar/bar.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { LongComponent } from './long/long.component';
import { FooterbarComponent } from './footerbar/footerbar.component';
import { BottleComponent } from './bottle/bottle.component';
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    AddComponent,
    PerfumeComponent,
    MiddleComponent,
    FooterComponent,
    CardComponent,
    BarComponent,
    LongComponent,
    FooterbarComponent,
    BottleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule, 
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    MatTabsModule,
    MatCardModule,
    MatMenuModule,
    MatGridListModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
