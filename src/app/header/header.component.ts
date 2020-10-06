import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userAuthenticated = this.authService.getisAuthenticated();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.userAuthenticated = isAuthenticated;
    });
  }

  onLogout() {
    this.authService.logoutUser();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
