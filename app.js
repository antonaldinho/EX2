//Codigo por Jose Antonio Aleman
//A01196565
//Desarrollo de Aplicaciones Web
const express = require('express');
const app = express();
const path = require('path');
const publicDir = path.join(__dirname, 'public');
const PORT = process.env.PORT || 3000;
const met = require('./met.js');

app.use(express.static(publicDir));

app.get('/', function(req, res) {
    return res.send({
        greet: 'Bienvenido a la API del examen 2'
    })
})
app.get('/students/:id', function(req, res) {
    if(!req.params.id) {
        return res.send({
            error: 'Parameter id not found'
        })
    }
    else if(req.params.id == "A01196565") {
        return res.send({
            "id": "A01196565",
            "fullname": "Jose Antonio Aleman Salazar",
            "nickname": "Antonaldinho",
            "age": 21
        })
    }
    else {
        return res.send({
            "error": "No se encontro ningun estudiante con esa matricula"
        })
    }
})

app.get('/met', function(req, res) {
    var objectID;
    if(!req.query.search) {
        return res.send({
            error: 'Parameter search not found'
        })
    }
    else {
        met.getObject(req.query.search, function(error, response) {
            if(error) {
                return res.send({
                    error: error
                })
            }
            else {
                objectID = response.objectId;
                met.getInfo(objectID, function(error, response) {
                    if(error) {
                        return res.send({
                            error: error
                        })
                    }
                    else {
                        res.send({
                            searchTerm: req.query.search,
                            artist : response.artist,
                            title: response.title,
                            year: response.year,
                            technique: response.technique,
                            metUrl: response.metUrl
                        })
                    }
                })
            }
        })
    }
})

app.listen(PORT, function() {
    console.log('up and running in port: ' + PORT);
})