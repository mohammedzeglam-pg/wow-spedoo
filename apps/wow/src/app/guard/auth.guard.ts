import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthService } from 'libs/auth/src/lib/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
