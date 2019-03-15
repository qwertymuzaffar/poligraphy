import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MatSelectChange, MatSlideToggleChange} from '@angular/material';
import {UserType} from '../../interfaces/user.interface';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  form: FormGroup;

  /**
   * Список всех регионов
   */
  regions: any[] = [
    {id: 1, title: 'Московская область'},
    {id: 2, title: 'Ростовская область'}
  ];

  /**
   * Список городов
   */
  cities: any[] = [
    {id: 1, title: 'Зелиноград', regionId: 1},
    {id: 2, title: 'Ростов-на-дону', regionId: 2},
  ];

  /**
   * Список городов по выбранному региону
   */
  cityList: any[] = [];

  /**
   * Виды юр лица
   */
  legalPersonType: any[] = [
    {id: 1, title: 'Индивидуальный предприниматель (ИП)'},
    {id: 2, title: 'ООО'},
    {id: 3, title: 'ЗАО'},
  ];

  constructor(private authService: AuthService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<RegisterDialogComponent>) {
    this.initForm();
  }

  ngOnInit() {
  }

  /**
   * Инициализации формы
   */
  initForm() {
    this.form = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]],
      region: [''],
      city: [''],
      inn: [''],
      legalPersonType: [],
      organization: [''],
      userType: [UserType.PERSON],
      agree: [false, [Validators.requiredTrue]]
    }, {validator: this.passwordMatch});
  }

  /**
   * Метод регистрации
   */
  register() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(item => {
        this.form.controls[item].markAsTouched();
      });
      return;
    }

    this.authService.register(this.form.value)
      .subscribe(res => {
        this.dialogRef.close(true);
      });
  }

  /**
   * Событие изменения типа пользователя
   * @param e: MatSlideToggleChange event
   */
  onUserTypeChanged(e: MatSlideToggleChange) {
    if (e.checked) {
      this.form.controls['userType'].setValue(UserType.LEGAL);
      this.form.controls['inn'].setValidators([Validators.required]);
      this.form.controls['organization'].setValidators([Validators.required]);
      this.form.controls['legalPersonType'].setValue(this.legalPersonType[0].id);
    } else {
      this.form.controls['userType'].setValue(UserType.PERSON);
      this.form.controls['inn'].setValue(['']);
      this.form.controls['organization'].setValue(['']);
      this.form.controls['legalPersonType'].setValue(null);

      this.form.controls['inn'].setValidators(null);
      this.form.controls['organization'].setValidators(null);
    }
  }

  /**
   * Событие изменения региона
   * @param e: MatSelectChange
   */
  onRegionChanged(e: MatSelectChange) {
    this.cityList = [this.cities.filter(item => item.regionId === e.value)][0];
    this.form.controls['city'].setValue(null);
  }

  /**
   * Для сверки пароля
   * @param control: AbstractControl
   */
  passwordMatch(control: AbstractControl) {
    const password = control.get('password').value;
    const confirm = control.get('confirm').value;
    if (password !== confirm) {
      control.get('confirm').setErrors({noMatch: true});
    }
  }
}
