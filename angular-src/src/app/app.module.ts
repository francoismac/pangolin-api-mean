import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './component/auth/auth.component';
import { ProfilViewComponent } from './component/profil-view/profil-view.component';
import { InscriptionComponent } from './component/inscription/inscription.component';
import { RouterModule, Routes} from  '@angular/router';
import { AccueilComponent } from './component/accueil/accueil.component';
import { ValidateService } from './services/validate.service';
import {AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard} from './guards/auth.guard';
import { CreerAmiComponent } from './component/creer.ami/creer.ami.component';

const appRoutes: Routes = [
 {path: '', component: AccueilComponent},
 {path: 'accueil', component: AccueilComponent},
 {path: 'inscription', component: InscriptionComponent},
 {path: 'auth', component: AuthComponent },
 {path: 'profil', component: ProfilViewComponent, canActivate:[AuthGuard]},
 {path: 'creerami', component: CreerAmiComponent, canActivate:[AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProfilViewComponent,
    InscriptionComponent,
    AccueilComponent,
    CreerAmiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
  ],
  providers: [ValidateService, 
              AuthService,
              AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
