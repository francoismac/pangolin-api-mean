import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  utilisateur: any;

  constructor( private http:Http) { }

  inscrireUtilisateur(utilisateur) {
  	let headers = new Headers();
  	headers.append('Content-type', 'application/json');
  	return this.http.post('http://localhost:3000/api/inscription', utilisateur, {headers: headers}).pipe(
  	map(res => res.json()))
  }

  modifierDonne(utilisateur) {
    let headers = new Headers();
    this.chargerToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.put('http://localhost:3000/api/profile',utilisateur, {headers: headers}).pipe(
    map(res => res.json()))    
  }

  connecterUtilisateur(utilisateur) {
   	let headers = new Headers();
  	headers.append('Content-type', 'application/json');
  	return this.http.post('http://localhost:3000/api/connexion', utilisateur, {headers: headers}).pipe(
  	map(res => res.json())) 	
  }

  stockerDonneesUtilisateurs(token, utilisateur) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
    this.authToken = token;
    this.utilisateur = utilisateur;

  }

  getProfile() {
    let headers = new Headers();
    this.chargerToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/api/profile', {headers: headers}).pipe(
    map(res => res.json()))      

  }

  ajouterAmis(utilisateur, id) {
    let headers = new Headers();
    this.chargerToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.put('http://localhost:3000/api/ajouter/'+id, utilisateur, {headers: headers}).pipe(
    map(res => res.json()))   
  }

  supprimerAmis(utilisateur, id) {
    let headers = new Headers();
    this.chargerToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.put('http://localhost:3000/api/supprimer/'+id, utilisateur, {headers: headers}).pipe(
    map(res => res.json()))  
  }

  chargerToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  estConnecte() {
    return tokenNotExpired('id_token');
  }

  deconnecterUtilisateur() {
    this.authToken = null;
    this.utilisateur = null;
    localStorage.clear();
  }
}
