import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../../models/user.model";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {catchError, Observable, tap, throwError} from "rxjs";
import {LoginResponse} from "../../models/login.response";

export const snackbarConfig: MatSnackBarConfig = {
  duration: 2500,
  horizontalPosition: 'right',
  verticalPosition: 'top'
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar
  ) { }

  async login(user: UserModel): Promise<Observable<LoginResponse>> {
    return this.http.post<LoginResponse>('api/v1/users/login', user)
      .pipe(
        tap((res: LoginResponse) => localStorage.setItem('todo_app_token', res.access_token)),
        tap(() => this.snackbar.open('Login successfully', 'Close', snackbarConfig)),
        catchError(e => {
          this.snackbar.open(`${e.error.message}`, 'Close', snackbarConfig);
          return throwError(e);
        })
      );
  }

  async register(user: UserModel): Promise<Observable<UserModel>> {
    return this.http.post<UserModel>('api/v1/users', user)
      .pipe(
        tap((createdUser: UserModel) => this.snackbar.open(`User ${createdUser.username} was created`, 'Close', snackbarConfig)),
        catchError(e => {
          this.snackbar.open(`${e.error.message}`, 'Close', snackbarConfig);
          return throwError(e);
        })
      );
  }
}
