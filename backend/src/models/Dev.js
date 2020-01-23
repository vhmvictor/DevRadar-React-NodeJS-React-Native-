const mongoose = require('mongoose'); //importando biblioteca do MongoBD
const PointSchema = require('./utils/PointSchema'); //essa nova pasta "utils" não é um Schema de fato, é somente a criação de um novo tipo de variável que necessita através da documentação do Mobngo

const DevSchema = new mongoose.Schema({ //setando um esquema em Mongo
    name: String, //setando variáveis e seu tipo
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String], //como setar um vetor em NodeJS
    location: {
        type: PointSchema,
        index: '2dsphere' //novamente, devemos criar esse parametro index pois consta na documentação do Mongo para utilização de geolocalização
    },
})

module.exports = mongoose.model('Dev', DevSchema);