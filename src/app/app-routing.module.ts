import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './auth-guard.service';

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'map', component: MapComponent, canActivate: [AuthGuard]},
    {path: 'error', component: ErrorComponent}
];

const authRoutes: Routes = [
    {path: 'registration', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
]

@NgModule({
    imports: [
            RouterModule.forRoot(appRoutes),
            RouterModule.forChild(authRoutes)
            ],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule {
    
}