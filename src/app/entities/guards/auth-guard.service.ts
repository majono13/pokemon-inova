import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

constructor(private authService: AuthService, private router: Router) { }

async canActivate(): Promise<boolean> {
  const isAuthenticated = await this.authService.validateToken();
  console.log(isAuthenticated)
  if (isAuthenticated) {
    return true;
  } else {
    this.router.navigate(['/login']);
    return false;
  }
}

}
