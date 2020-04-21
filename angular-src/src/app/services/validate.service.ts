import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

 validateInscription(utilisateur){
 	if(utilisateur.nom == undefined || utilisateur.login == undefined || utilisateur.mdp == undefined ) {
 		return false;
 	} else {
 		return true;
 	}
 }

 validateConnexion(utilisateur){
 	if(utilisateur.login == undefined || utilisateur.mdp == undefined ) {
 		return false;
 	} else {
 		return true;
 	}
 }

}
