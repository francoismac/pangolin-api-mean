import { Ami } from './ami';

export class Utilisateur {
  _id: number;
  nom: string;
  age: number;
  famille: string;
  race: string; 
  amis: Ami[]; 


  constructor() {}

  setNom(nom: string) {
   this.nom = nom;
  }

   setAge(age: number) {
   this.age = age;
  }

  setfamille(famille: string) {
   this.famille = famille;
  }

  setRace(race: string) {
   this.race = race;
  }

  addAmi(ami: Ami) {
  	this.amis.push(ami);
  }

  delAmi(ami: Ami) {
  	this.amis.filter(obj => obj !== ami);
  }
}