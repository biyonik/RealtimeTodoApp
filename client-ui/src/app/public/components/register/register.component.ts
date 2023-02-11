import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../validators/custom-validators";
import {UserService} from "../../services/user-service/user.service";
import {Router} from "@angular/router";
import {tap} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required])
  }, {
    validators: CustomValidators.passwrodsMatching
  });

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {
  }

  async ngOnInit(): Promise<void> {
  }

  async register() {
    if (this.form.valid) {
      await (await this.userService.register({
        email: this.email.value,
        username: this.username.value,
        password: this.password.value
      })).pipe(
        tap(() => this.router.navigate(['../login']))
      ).subscribe();
    }
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get passwordConfirm(): FormControl {
    return this.form.get('passwordConfirm') as FormControl;
  }

  async ngOnDestroy(): Promise<void> {
  }

}
