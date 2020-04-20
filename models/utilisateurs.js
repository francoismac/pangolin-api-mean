const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const UtilisateurSchema = mongoose.Schema({
	login:{
		type: String,
		required: true
	},
	mdp:{
		type: String,
		required: true
	},
	nom:{
		type: String,
		required: true
	},	
	age:{
		type: Number,
		required: false
	},
	famille:{
		type: String,
		required: false
	},

	amis:[{
			_id: mongoose.Schema.Types.ObjectId,
			nom: String,
			age: Number,
			famille: String
		}]
});

const Utilisateur = module.exports = mongoose.model('Utilisateur', UtilisateurSchema);

module.exports.getUtilisateurById = function(id, callback){
	Utilisateur.findById(id, callback);
};

module.exports.getUtilisateurByLogin = function(login, callback){
	const query = {login: login};
	Utilisateur.findOne(query, callback);
};

module.exports.getUtilisateurByNom = function(nom, callback){
	const query = {nom: nom};
	Utilisateur.findOne(query, callback);
};

module.exports.addUtilisateur = function(newUtilisateur, callback){
	bcrypt.genSalt((err, salt) => {
		bcrypt.hash(newUtilisateur.mdp, salt, (err, hash) => {
			if (err) throw err;
			newUtilisateur.mdp = hash;
			newUtilisateur.save(callback);
		});
	});
}

module.exports.compareMdp = function(mdp_entre, hash, callback){
	bcrypt.compare(mdp_entre, hash, (err, isMatch) => {
		if (err) throw err;
		callback(null, isMatch);
	}) 
}

module.exports.ajouterAmi = function(ami, nom_utilisateur, callback){

    Utilisateur.findOne({nom: ami.nom}, function(err, obj) {
    	if (err) throw err;
		else
		{
			console.log("Cette objet existe");
			console.log(obj);
			const filter = {nom : nom_utilisateur};
			const update = {amis : obj};
			Utilisateur.findOneAndUpdate(filter, {$push: update}, {useFindAndModify: false}, callback);
		}

	} );


}

module.exports.supprimerAmi = function(ami, nom_utilisateur, callback){
	console.log(ami._id);
	const filter = {nom : nom_utilisateur};
	const update = {amis : {_id : ami._id}};
	Utilisateur.findOneAndUpdate( filter, {$pull: update }, {useFindAndModify: true}, callback);
}

module.exports.modifierMesInfos = function(utilisateur,info ,callback){
		console.log(info);
		Utilisateur.findByIdAndUpdate(utilisateur, 
	{
		$set: {nom: info.nom, age: info.age, famille: info.famille }
	},
	{
		useFindAndModify: false,
		new: true
	}, callback)
}