import {Component, Inject} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {DOCUMENT} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login-status',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent {

  isAuthenticated: boolean = false;
  profileJson: string | undefined;
  userEmail: string | undefined;
  private userFullName: string = '';
  storage: Storage = sessionStorage;

  constructor(private auth: AuthService, @Inject(DOCUMENT) private doc: Document) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((authenticated: boolean) => {
      this.isAuthenticated = authenticated;
      console.log('User is authenticated: ', this.isAuthenticated);
    });

    this.auth.user$.subscribe((user) => {
      this.userEmail = user?.email;
      this.storage.setItem('userEmail', JSON.stringify(this.userEmail));
      console.log('User ID: ', this.userEmail);
    });
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      this.auth.user$.subscribe(
        (res) => {
          this.userFullName = res?.name as string;

          const theEmail = res?.email;

          if (theEmail) {
            this.storage.setItem('userEmail', JSON.stringify(theEmail));
          }
        }
      );
    }
  }

  login() {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }

}
