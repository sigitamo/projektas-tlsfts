import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GooglemapComponent } from './googlemap/googlemap.component';
import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { GroupItemComponent } from './group/group-item/group-item.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'googlemap', component: GooglemapComponent},
    {path: 'map', component: MapComponent, 
    // canActivate: [AuthGuard]
}
];

const authRoutes: Routes = [
    {path: 'registration', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},    
    {path: 'adminpanel', component: AdminpanelComponent,
    // canActivate:[AuthGuard]
    },
    {path: 'groups', component: GroupComponent},
    {path: 'groups/:id', component: GroupItemComponent},
    {path: 'users', component: UserComponent,
        // canActivate: [AuthGuard]
    },
    {path: 'not-found', component: PageNotFoundComponent},
    {path: '**', redirectTo: '/not-found' }
]

@NgModule({
    imports: [
            RouterModule.forRoot(appRoutes),
            RouterModule.forChild(authRoutes),
            ],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule {
    
}