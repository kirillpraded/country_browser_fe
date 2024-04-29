import {Component, model, OnDestroy, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnDestroy {
  password = model("")
  email = model("")
  isLoginFailed = signal(false);
  loginFailedMessageExpirationTime: any

  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService,
    private location: Location) {
  }

  async onSubmit() {
    const body = await this.userService.login({
      password: this.password(),
      email: this.email(),
    })

    if (body.status == 200) {
      this.cookieService.set('token', body.data.token, 3600)
      this.cookieService.set('email', body.data.email, 3600)
      if (document.referrer) {
        this.location.back()
      }
      await this.router.navigate(["/"])
    } else {
      console.log(1)
      this.loginFailed()
    }
  }

  private loginFailed() {
    this.isLoginFailed.set(true)
    this.loginFailedMessageExpirationTime = setTimeout(() => {
      this.isLoginFailed.set(false)
    }, 5000)
  }

  private clearTimeoutMessage() {
    clearTimeout(this.loginFailedMessageExpirationTime)
  }

  ngOnDestroy(): void {
    this.clearTimeoutMessage()
  }
}
