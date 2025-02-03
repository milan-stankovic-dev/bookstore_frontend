import { Routes } from '@angular/router';

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
    loadComponent: () => import('./components/cart/cart.component')
    .then(m => m.CartComponent)
},
{
    path:'book',
    pathMatch: 'full',
    loadComponent: () =>import('./components/book/book.component')
    .then(m => m.BookComponent)
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