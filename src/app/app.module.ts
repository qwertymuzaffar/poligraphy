import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule, MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatSelectModule,
  MatSlideToggleModule
} from '@angular/material';
import {AuthService} from './services/auth.service';
import {LoginDialogComponent} from './components/login-dialog/login-dialog.component';
import {RegisterDialogComponent} from './components/register-dialog/register-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginDialogComponent,
    RegisterDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [AuthService],
  entryComponents: [
    LoginDialogComponent,
    RegisterDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
