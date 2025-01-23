import { Routes } from '@angular/router';

export const routes: Routes = [{
    path:'home',
    pathMatch: 'full',
    loadComponent: () => import('./components/home/home/home.component')
        .then(m => m.HomeComponent)
},
{
    path:'products',
    pathMatch: 'full',
    loadComponent: () => import('./components/products/products/products.component')
    .then(m => m.ProductsComponent)
},
{
    path:'cart',
    pathMatch: 'full',
    loadComponent: () => import('./components/cart/cart.component')
    .then(m => m.CartComponent)
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