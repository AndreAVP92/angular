/* Modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

/* Components */
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { InicioComponent } from './inicio.component';
import { RegisterComponent } from './security/register/register.component';
import { LoginComponent } from './security/login/login.component';
import { NavComponent } from './navigation/nav/nav.component';
import { MenuListComponent } from './navigation/menu-list/menu-list.component';

/* Services */
import { SecurityService } from './security/security.service';
import { BooksService } from './books/books.service';
import { BookNewComponent } from './books/book-new.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorsServices } from './authors/authors.service';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavComponent,
    MenuListComponent,
    /* BOOKS */
    BooksComponent,
    BookNewComponent,
    /* SECURITY */
    RegisterComponent,
    LoginComponent,
    AuthorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue:'es-ES'},
    BooksService,
    SecurityService,
    BooksService,
    AuthorsServices
  ],
  bootstrap: [AppComponent],
  entryComponents: [BookNewComponent]
})
export class AppModule { }
