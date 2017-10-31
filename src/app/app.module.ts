import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { LoggingInterceptor } from './logging-interceptor';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ConfigService } from './config.service';
import { AuthService } from './auth.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GooglemapComponent } from './googlemap/googlemap.component';
import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { UserService } from './user/user.service';
import { GroupItemComponent } from './group/group-item/group-item.component';
import { ParentComponent } from './exampleSecond/parent.component';
import { ChildOneOneComponent } from './exampleSecond/childOne.component';
import { ChildTwoTwoComponent } from './exampleSecond/childTwo.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    MapComponent,
    HomeComponent,
    HeaderComponent,
    PageNotFoundComponent,
    LoadingSpinnerComponent,
    SidebarComponent,
    GooglemapComponent,
    UserComponent,
    GroupComponent,
    AdminpanelComponent,
    GroupItemComponent,
    ParentComponent,
    ChildOneOneComponent,
    ChildTwoTwoComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBdpoVlT7F8kK5eX50grCeJLB-4BDyBLBo'}),
    AgmSnazzyInfoWindowModule,
  ],
 
  exports: [
    HeaderComponent,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoggingInterceptor,
    multi: true
  }, 
    ConfigService,
    AuthService,
    UserService,
    GroupComponent,
    UserComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }



