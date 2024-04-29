import {CanActivate, Router, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationPageGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly cookieService: CookieService
  ) {}

  canActivate(): boolean | UrlTree {
    const canOpenPage = !(!!this.cookieService.get("token"));

    return canOpenPage
  }
}
