const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const config = require('./config/database');
const routes = require('./config/passport')(passport);
const app = express();
const port = 3000; 


//Connexion à mongodb
mongoose.connect(config.database);

mongoose.connection.on('connected', () =>{
	console.log('Connecté à la BDD: '+config.database)
});

mongoose.connection.on('error', (err) =>{
	console.log('Erreur lors de la connexion à la BDD:' +err)
});

const route = require('./routes/route');


//ajout du middleware
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());


app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', route);

//test du server
app.get('/', (req, res) =>{
	res.send('le serveur marche');
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.htm'));
});
app.listen(port, () => {
	console.log('Le serveur est à l\'écoute du port :' +port);
}); 