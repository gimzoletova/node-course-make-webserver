const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}, ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);            
        }
    });
    console.log(log);    
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page'
//     })
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () =>  new Date().getFullYear());
hbs.registerHelper('screamIt', (text) =>  text.toUpperCase());

app.get('/', (req, res) => {
    // res.send('<h1 style="color:red">Hello Express!<h1>')
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        // currenYear: new Date().getFullYear(),
        welcomeMsg: 'Hi, welcome to my site'
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
        // currenYear: new Date().getFullYear()
    });
});

app.get('/bad', (req,res) => {
    res.send({errorMessage: 'bad request'});
});

app.listen(3000, () => {
    console.log('Srever listens to  port 3000');    
});