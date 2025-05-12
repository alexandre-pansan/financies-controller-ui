import { Routes } from '@angular/router';

export const routes: Routes = [
    //generate the routes for the app
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
];
