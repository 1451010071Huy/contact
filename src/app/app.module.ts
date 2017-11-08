import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';

import { ContactService } from './contact.service';
import { HttpModule } from '@angular/http';
import { ToastModule } from 'ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './filter.pipe';
import { Ng2OrderModule } from 'ng2-order-pipe'

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    NgxPaginationModule,
    Ng2OrderModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent],
})
export class AppModule { }
