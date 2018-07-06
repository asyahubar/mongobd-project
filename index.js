const express = require('express');
const app = express();

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const url = 'mongodb://localhost:27017/ah';
const dbName = 'ah';
let db;

MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    db = client.db(dbName);
});

app.get('/', (request, response) => {
    insertDocuments(function(err, result) {
        response.send(result);
    })
});

app.get('/users', (request, response) => {
    getUsers({}, function(err, result) {
        response.send(result);
    });
});

app.get('/users/:id', (request, response) => {
    getUsers(
        {"_id": new mongo.ObjectID(request.params.id)},
        function(err, result) {
        response.send(result);
    });
});

function getUsers(args, callback) {
    const UsersCollection = db.collection("Users");
    UsersCollection.find(args).toArray(callback);
}

function insertDocuments(callback) {
    const UsersCollection = db.collection('Users');

    UsersCollection.drop();

    UsersCollection.insert([
        {
            "username": "billie",
            "password": "jean",
            "avatar": "image3.jpeg"
        },
        {
            "username": "josie",
            "password": "password",
            "avatar": "pic.png"
        },
        {
            "username": "lark",
            "password": "tweet",
            "avatar": "nest.gif"
        },
        {
            "username": "jupiter",
            "password": "keeponturnin",
            "avatar": "me.jpeg"
        }
    ], callback);
}

app.listen('3000', () => {
    console.log('Running the server on port: 3000');
});