import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {MatDialog} from '@angular/material';
import {User} from './interfaces/user.interface';
import {LoginDialogComponent} from './components/login-dialog/login-dialog.component';
import {RegisterDialogComponent} from './components/register-dialog/register-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  user: User;

  constructor(private authService: AuthService, public dialog: MatDialog) {
    this.user = JSON.parse(localStorage.getItem('user')) || null;
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(res => {
      if (res) {
        this.user = JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  /**
   * Показать диалог авторизации
   */
  showLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px'
    });
  }

  /**
   * Показать диалог регистрации
   */
  showRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        alert('Вы успешно зарегистрированы!');
      }
    });
  }

  /**
   * Метод выхода
   */
  logOut() {
    this.user = null;
    localStorage.clear();
  }

  ngOnDestroy(): void {
  }
}
