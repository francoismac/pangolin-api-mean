import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {ValidateService } from '../../services/validate.service'


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  login: String;
  mdp: String;
  authStatus: boolean; 



  constructor(private validateService: ValidateService,
              private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
  }

  onConnexionSubmit(){
    const utilisateur = {
      login: this.login,
      mdp: this.mdp,
    };
    if(!this.validateService.validateConnexion(utilisateur))
    {
        this.flashMessage.show('Veuillez remplir tout les champs', { cssClass: 'alert-danger', timeout: 1000 });

    }
    this.authService.connecterUtilisateur(utilisateur).subscribe(data => {
      console.log(data.success);
      if (data.success) {
            this.flashMessage.show("Vous etes bien connecté",{
                          cssClass: 'alert-success',
                            timeout: 5000});           
            this.authService.stockerDonneesUtilisateurs(data.token, data.utilisateur);
            this.router.navigate(['/profil']);
      } else {
            this.flashMessage.show("Vous n'avez pas pu vous connecter" ,{
                          cssClass: 'alert-danger',
                            timeout: 5000}); 
          this.router.navigate(['/inscription']);
      }
    })

  }
}
