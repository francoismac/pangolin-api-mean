import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Utilisateur } from '../../class/utilisateur'; 
import { Ami } from '../../class/ami'; 

@Component({
  selector: 'app-profil-view',
  templateUrl: './profil-view.component.html',
  styleUrls: ['./profil-view.component.scss']
})
export class ProfilViewComponent implements OnInit {



  utilisateur = new Utilisateur(); 
   monId : number;
   mesamis : Ami[];
   estvide :boolean;
  
  constructor(private authService: AuthService, 
  			      private router: Router,
              private flashMessage: FlashMessagesService ) 
              {}
   

  ngOnInit() {
  	this.authService.getProfile().subscribe(profile => {
  		this.utilisateur = profile.utilisateur;
      this.mesamis = profile.utilisateur.amis;
      console.log(this.utilisateur);
      if (this.mesamis.length == 0 ) 
        this.estvide = true;
     },
  	err => {
  		return false;
  	});
  }

  onSubmit(form: NgForm) {
    this.authService.modifierDonne(this.utilisateur).subscribe(data => {
      console.log(data);
      if(data.success){
            this.flashMessage.show("Donnees modifiées",{
                          cssClass: 'alert-success',
                            timeout: 5000});        
      } else {
        this.flashMessage.show("Erreur lors de la modification",{
                          cssClass: 'alert-danger',
                            timeout: 5000});
      }
    })
  }

  onAjouterAmi(ami) {
    this.authService.ajouterAmis(this.utilisateur, ami).subscribe(data => {
      console.log(ami);
      if (data.success) {
             this.flashMessage.show("Ajouté",{
                          cssClass: 'alert-success',
                            timeout: 5000});   
                            location.reload();
      }
      else {
                     this.flashMessage.show("Veuillez entrer le nom d'un pangolin déjà inscrit sur ce site",{
                          cssClass: 'alert-danger',
                            timeout: 5000});      
      }
    })
  }

  onSupprimerAmi(ami) {
    this.authService.supprimerAmis(this.utilisateur, ami).subscribe(data => {
      if (data.success) {
             this.flashMessage.show("Supprimé",{
                          cssClass: 'alert-success',
                            timeout: 5000});  
                            location.reload();     
      }
      else {
                     this.flashMessage.show("Il y a eu un problème",{
                          cssClass: 'alert-danger',
                            timeout: 5000});      
      }
    })
  }
 }  


