import { Component, OnInit } from '@angular/core';
import {ValidateService } from '../../services/validate.service'
import {AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  nom: String;
  login: String;
  mdp: String;
  constructor(private validateService: ValidateService,
  			  private authService: AuthService,
  			  private router: Router,
  			  private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
  }

  onInscriptionSubmit(){
  	const utilisateur = {
  		nom: this.nom,
  		login: this.login,
  		mdp: this.mdp
  	};

  	if(!this.validateService.validateInscription(utilisateur))
  	{
  		  this.flashMessage.show('Veuillez remplir tout les champs', { cssClass: 'alert-danger', timeout: 1000 });

  	}

    this.authService.inscrireUtilisateur(utilisateur).subscribe(data => {
    	if(data.success){
						this.flashMessage.show("Vous etes maintenant inscrit",{
				    		    			cssClass: 'alert-success',
				    		    		    timeout: 5000});    		
						this.router.navigate(['/auth']);
    	} else {
    		this.flashMessage.show("Erreur lors de l'inscription",{
				    		    			cssClass: 'alert-danger',
				    		    		    timeout: 5000});
    		this.router.navigate(['/inscription']);
    	}
    })
  }


}
