const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Utilisateurs = require('../models/utilisateurs');
const config = require('../config/database');

module.exports = function(passport){
	var opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
	opts.secretOrKey = config.secret;
	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
		Utilisateurs.getUtilisateurById(jwt_payload.data._id, (err, utilisateur) => {
			if (err) {
				return done(err, false);
			}

		if (utilisateur){
			return done(null, utilisateur);
		} else {
			return done(null, false);
		}
		});
	}));
}