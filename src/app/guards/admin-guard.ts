import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.userProfile$.pipe(
    take(1),
    map(user => {
      if (user && user['rol'] === 'admin') {
        return true; 
      } else {
        router.navigate(['/home']); // Si no es admin, mándalo al home
        return false;
      }
    })
  );
};