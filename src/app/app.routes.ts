import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [{
    path:'',
    pathMatch: 'full',
    loadComponent: () => import('./components/home/home.component')
        .then(m => m.HomeComponent)
},
{
    path:'books',
    pathMatch: 'full',
    loadComponent: () => import('./components/books/books.component')
    .then(m => m.BooksComponent)
},
{
    path:'cart',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () => import('./components/cart/cart.component')
    .then(m => m.CartComponent)
},
{
    path:'book',
    pathMatch: 'full',
    loadComponent: () =>import('./components/book/book.component')
    .then(m => m.BookComponent)
},
{
    path:'login',
    pathMatch: 'full',
    loadComponent: ()=>import('./components/login/login.component')
    .then(m => m.LoginComponent)
},
{
    path:'logout',
    pathMatch: 'full',
    loadComponent: ()=>import('./components/logout/logout.component')
    .then(m => m.LogoutComponent)
},
{
    path:'register',
    pathMatch: 'full',
    loadComponent: () => import('./components/register/register.component')
        .then(m => m.RegisterComponent)
}];

/*


import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./home/home.component').then(
                m => m.HomeComponent)
        }
    },
    {
        path: 'todos',
        loadComponent: () => {
            return import('./todos/todos.component').then(
                m => m.TodosComponent)
        }
    }];
*/