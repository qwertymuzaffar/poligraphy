import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  form: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<LoginDialogComponent>) {
    this.initForm();
  }

  ngOnInit() {
  }

  /**
   * Инициализация формы
   */
  initForm() {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * Метод входа
   */
  authorize() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(item => {
        this.form.controls[item].markAsTouched();
      });
      return;
    }

    this.authService.authorize(this.form.value.login, this.form.value.password)
      .subscribe(res => {
        if (!res) {
          alert('Неправильные данные для входа');
          return;
        }
        this.authService.authorizeStatus.next(true);
        this.dialogRef.close();
      });
  }

}
