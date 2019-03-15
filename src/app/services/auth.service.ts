import {Injectable} from '@angular/core';
import {User, UserType} from '../interfaces/user.interface';
import {Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authorizeStatus: Subject<boolean> = new Subject<boolean>();
  private users: User[] = [];

  constructor() {
    /**
     * Демо данные
     */
    this.users.push({
      fullName: 'Тестеров Тест Тестерович',
      email: 'test@mail.ru',
      password: '1234',
      region: 'Московская область',
      city: 'Зелиноград',
      phone: '789456123',
      inn: null,
      organization: null,
      userType: UserType.PERSON,
      legalPersonType: null
    });
  }

  /**
   * Метод входа
   * @param login: телефон или Эл.почта
   * @param password: пароль
   */
  authorize(login, password): Observable<boolean> {
    const user = this.users.filter(item => ((item.email === login || item.phone === login) && item.password === password));
    if (user.length > 0) {
      localStorage.setItem('user', JSON.stringify(user[0]));
    }
    return of(user.length > 0);
  }

  /**
   * Метод входа
   * @param data: users Data
   */
  register(data: User): Observable<boolean> {
    this.users.push(data);
    return of(true);
  }

  /**
   * Событие авторизации
   */
  isLoggedIn(): Observable<boolean> {
    return this.authorizeStatus.asObservable();
  }
}
