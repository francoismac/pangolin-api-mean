import { Component, OnInit } from '@angular/core';
import {ValidateService } from '../../services/validate.service'
import {AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Utilisateur } from '../../class/utilisateur'; 
import { Ami } from '../../class/ami'; 

@Component({
  selector: 'app-creer.ami',
  templateUrl: './creer.ami.component.html',
  styleUrls: ['./creer.ami.component.scss']
})
export class CreerAmiComponent implements OnInit {

  utilisateur = new Utilisateur(); 
  nom: string;
  login: string;
  mdp: string;
  ami_cree: Ami; 
  constructor(private validateService: ValidateService,
  			  private authService: AuthService,
  			  private router: Router,
  			  private flashMessage: FlashMessagesService) { }

  ngOnInit() {  	

  	this.authService.getProfile().subscribe(profile => {
  	this.utilisateur = profile.utilisateur;
  	console.log(this.utilisateur);
  	err => {
  		return false;
  	};
  });
  }

  onCreationetAjout() {
   	this.ami_cree = new Ami(); 
   	this.ami_cree.nom = this.nom;
   	this.ami_cree.login = this.login;
   	this.ami_cree.mdp = this.mdp;
  	if(!this.validateService.validateInscription(this.ami_cree))
  	{
  		  this.flashMessage.show('Veuillez remplir tout les champs', { cssClass: 'alert-danger', timeout: 1000 });

  	}

    this.authService.inscrireUtilisateur(this.ami_cree).subscribe(data => {
    	if(data.success){
						this.flashMessage.show("Ami a été créé",{
				    		    			cssClass: 'alert-success',
				    		    		    timeout: 5000});
						    this.authService.ajouterAmis(this.utilisateur, this.ami_cree.nom).subscribe(data => {
						      if (data.success) {
						             this.flashMessage.show("Ajouté",{
						                          cssClass: 'alert-success',
						                            timeout: 5000});   
						                            location.reload();
						      }
						      else {
						      				console.log(data);
						                     this.flashMessage.show("Veuillez entrer le nom d'un pangolin déjà inscrit sur ce site",{
						                          cssClass: 'alert-danger',
						                            timeout: 5000});      
						      }
						    })
						  
    	} else {
    		this.flashMessage.show("Erreur lors de l'inscription",{
				    		    			cssClass: 'alert-danger',
				    		    		    timeout: 5000});
    		this.router.navigate(['/creerami']);
    	}
    })
  } 	
}

