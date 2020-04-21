import { Component, OnInit } from '@angular/core';
import {ValidateService } from './services/validate.service'
import {AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private validateService: ValidateService,
              public authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService) { }
  
  onDeconnexionClick() {
  	this.authService.deconnecterUtilisateur();
  	this.flashMessage.show('Vous etes deconnecté', {
  		cssClass:'alert-success',
  		timeout: 3000
  	});
  }
}
