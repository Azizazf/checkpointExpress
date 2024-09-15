
const express = require('express');

const path = require('path');

const port = ('3000');

const app = express();

app.set('view engine', 'ejs'); // on configure le moteur de vue EJS

// middleware pour vérifier les heure ouvrables


function heureOuvrable(req, res, next) {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentHour = currentDate.getHours();



    // Verifier les heures d'ouverture 

    if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
        next();

    } else {

        res.send('<h1> Votre site n\'est disponible que pendant les heures ouvrables(du lundi au samedi, de 9h à 17h):</h1>')

    }


}


// appliquons notre middleware sur toutes les routes 

app.use(heureOuvrable);


// servir les fichiers statiques ( CSS)

app.use(express.static(path.join(__dirname, 'public')));

// route pour la page d'accueil

app.get('/', (req, res) => {

    res.render('home');

});

// route pour la page nos services

app.get('/services', (req, res) => {

    res.render('services');
});

//route pour la page Contactez-nous

app.get('/contact', (req, res) => {

    res.render('contact');

});

app.listen(port, () => {

    console.log('Serveur démarré sur le port 3000');

});


