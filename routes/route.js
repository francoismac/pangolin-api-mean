const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const Utilisateur = require('../models/utilisateurs');

//S'inscrire
router.post('/inscription', (req, res, next) => {
 let newUtilisateur = new Utilisateur({
    login: req.body.login,
 	mdp: req.body.mdp,
 	nom: req.body.nom
 });

 Utilisateur.addUtilisateur(newUtilisateur, (err, utilisateur) => {
 	if (err){
 		res.json({success : false, msg:'Le pangolin n\'a pas pu etre ajouté'})
 	} else {
 		res.json({success : true, msg:'Le pangolin a bien été ajouté'})
 	}
 })
});

//Se connecter
router.post('/connexion', (req, res, next) => {
	const login = req.body.login;
	const mdp = req.body.mdp;
	Utilisateur.getUtilisateurByLogin(login ,(err, utilisateur) => {
		if (err) throw err;
		if (!utilisateur){
			return res.json({success: false, msg: 'Utilisateur n\'existe pas'});
		};

		Utilisateur.compareMdp(mdp, utilisateur.mdp, (err, isMatch) => {
			if (err) throw err;
			if (isMatch) {
				const token = jwt.sign({data: utilisateur}, config.secret, {
					expiresIn: 60000
				});

				res.json({
					success: true, 
					token: 'JWT '+token,
					utilisateur: {
						nom: utilisateur.nom,
						login: utilisateur.login
					}
				});
			} else {
				return res.json({success: false, msg: "Mauvais mot de passe"});
			}
		})
	})
});


//Ajouter un ami
router.put('/ajouter/:nom', passport.authenticate('jwt', {session: false}), (req, res, next) =>{

	Utilisateur.getUtilisateurByNom(req.params.nom, (err, ami) => {
		if (ami === null) return res.json({success: false});
		else {
		
				Utilisateur.ajouterAmi(ami, req.user.nom, (err, doc) =>{
					if (err || !doc) return res.json({success: false});
					if (doc) 
					{
						res.json({success : true, 
						msg:'Le pangolin a bien été ajouté',
						utilisateur: {
						nom: doc.nom,
						amis: doc.amis
							}})
					}
			})};
	});


}); 

//Voir mes amis 
router.get('/profile/mesamis', passport.authenticate('jwt', {session: false}), (req, res, next) => {

	const id = req.user.amis;
	id.forEach( (x) => {
		console.log(x);
	})

	Utilisateur.getUtilisateurById(id ,(err, utilisateur) => {
		if (err) throw err;
		if (!utilisateur){
			return res.json({success: false, msg: 'Utilisateur n\'existe pas'});
		}
		else return res.json({amidelutilisateur: utilisateur});


	});
}) ;

//Voir mes informations
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
				
				res.json({msg:'Mon profil',
						  utilisateur: req.user})


});

//Modifier mes informations
router.put('/profile', passport.authenticate('jwt', {session: false}), function(req, res){
	Utilisateur.modifierMesInfos(req.user, req.body,  function(err, doc){
		if(err){			
			res.send("Erreur lors de la mise à jour:" +err)
		} else {
			res.json({success : true});
		}
	});
});


//Supprimer un ami
router.put('/supprimer/:nom', passport.authenticate('jwt', {session: false}), function(req, res, next){

Utilisateur.getUtilisateurByNom(req.params.nom, (err, ami) => {

	Utilisateur.supprimerAmi(ami, req.user.nom, (err, doc) =>{
			if (err || !doc) console.log("Il ya eu un probleme "+err);
			if (doc) 
			{
				res.json({success : true, 
				msg:'Le pangolin a bien été supprimé',
				utilisateur: {
				nom: doc.nom,
				amis: doc.amis
					}})
			}
	});

});

});

module.exports = router;