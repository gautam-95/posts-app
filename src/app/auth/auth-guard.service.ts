import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean | Observable<boolean> | Promise<boolean> {
        const isAuth = this.authService.getisAuthenticated();
        if (!isAuth) {
            this.router.navigate(['/auth/login']);
        }
        return isAuth;
    }
}
