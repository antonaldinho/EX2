const request = require('request');

function searchObjects(param, callback) {
    const museumUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=" + param;
    request({url: museumUrl, json: true}, function(error, response){
        if(error) {
            callback('something went wrong :(', undefined);
        }
        else if(response.body.total == 0) {
            callback('No se econtraron objetos con ese termino', undefined);
        }
        else {
            const result = {
                objectId: response.body.objectIDs[0]
            }
            callback(undefined, result);
        }
    })
}

function getInfoOfObject(param, callback) {
    const url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + param;
    request({url: url, json: true}, function(error, response) {
        if(error) {
            callback('something went wrong :(', undefined);
        }
        else if(response.body.message == "ObjectID not found") {
            callback('object id no valido', undefined);
        }
        else {
            const data = {
                artist : response.body.constituents[0].name,
                title: response.body.title,
                year: response.body.objectEndDate,
                technique: response.body.medium,
                metUrl: response.body.objectURL
            }
            callback(undefined, data);
        }
    })
}

module.exports = {
    getObject: searchObjects,
    getInfo: getInfoOfObject
}