import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
    {path: 'map', component: MapComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
    
}