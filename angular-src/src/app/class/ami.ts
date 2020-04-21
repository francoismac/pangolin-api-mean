
export class Ami {
	_id: number; 
  nom: string;
  login: string;
  mdp: string;
  age: number;
  famille: string;
  race: string; 



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

  getNom() {
   return this.nom;
  }  
}