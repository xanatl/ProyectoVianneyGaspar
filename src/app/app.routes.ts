import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'registro-usuario',
    loadComponent: () => import('./pages/registro-usuario/registro-usuario.page').then( m => m.RegistroUsuarioPage)
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./pages/usuarios/usuarios.page').then( m => m.UsuariosPage)
  },
  {
    path: 'pages',
    loadComponent: () => import('./pages/pages.page').then( m => m.PagesPage)
  }
];