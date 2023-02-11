import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user-service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {
  }

  async ngOnInit(): Promise<void> {

  }

  async login(): Promise<void> {
    if (this.form.valid) {
      await (await this.userService.login({
        email: this.email.value,
        password: this.password.value
      })).subscribe();
    }
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  async ngOnDestroy(): Promise<void> {

  }
}
