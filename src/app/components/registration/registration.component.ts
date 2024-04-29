import {Component, model} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ConfigService} from "../../services/config.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    FormsModule
  ],
  providers: [ConfigService],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  email = model("")
  lastName = model("")
  password = model("")
  firstName = model("")

  constructor(private userService: UserService, private router: Router) {

  }


  async onSubmit(): Promise<void> {
    const statusCode = await this.userService.createUser({
      firstName: this.firstName(),
      lastName: this.lastName(),
      password: this.password(),
      email: this.email(),
    })

    if (statusCode === 201) {
      await this.router.navigate(['/login'])
    } else {

    }

  }
}
