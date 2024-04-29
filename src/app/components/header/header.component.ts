import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  serverPath: string = "http://localhost:4200/"
  isUserAuthenticated: boolean = false;

  constructor(private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.isUserAuthenticated = !!this.cookieService.get("token")
  }

}
