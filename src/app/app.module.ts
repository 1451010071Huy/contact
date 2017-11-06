import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';

import { ContactService } from './contact.service';
import { HttpModule } from '@angular/http';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './filter.pipe';
import { SortPipe } from "./sort.pipe";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    FilterPipe,
    SortPipe, 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    NgxPaginationModule,
  ],
  providers: [ContactService],
  bootstrap: [AppComponent],
})
export class AppModule { }
