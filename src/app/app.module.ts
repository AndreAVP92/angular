/* Modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';

/* Components */
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { InicioComponent } from './inicio.component';
import { RegisterComponent } from './security/register/register.component';
import { LoginComponent } from './security/login/login.component';
import { NavComponent } from './navigation/nav/nav.component';
import { MenuListComponent } from './navigation/menu-list/menu-list.component';

/* Services */
import { BookService } from './services/books.service';
import { SecurityService } from './security/security.service';
import { BooksService } from './books/books.service';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    InicioComponent,
    RegisterComponent,
    LoginComponent,
    NavComponent,
    MenuListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    BookService,
    SecurityService,
    BooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
