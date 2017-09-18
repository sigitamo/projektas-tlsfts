import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoggingInterceptor} from './logging-interceptor';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header.component';
import { ConfigService } from './config.service';
import { ErrorComponent } from './error/error.component';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    MapComponent,
    HomeComponent,
    HeaderComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  exports: [
    HeaderComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoggingInterceptor,
    multi: true
  }, ConfigService,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
