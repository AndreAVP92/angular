import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { InicioComponent } from './inicio.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { SecurityRouter } from './security/security.router';

const routes: Routes = [
  { path: '', component: InicioComponent, canActivate: [SecurityRouter]},
  { path: 'books', component: BooksComponent, canActivate: [SecurityRouter]},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'authors', component: AuthorsComponent, canActivate: [SecurityRouter]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SecurityRouter]
})
export class AppRoutingModule { }
