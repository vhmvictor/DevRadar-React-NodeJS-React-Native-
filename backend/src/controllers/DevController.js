const axios = require('axios');
const Dev = require('../models/Dev'); //importando a classe Dev, onde foi setado o banco de dados
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {
    async index (request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body; //consumindo API do git hub para trazer informações do usuário pelo seu username
    
        let dev = await Dev.findOne({ github_username }); //Busca dentro do banco se já existe algum usuário com o mesmo user name do github, para n cadastrar duplicado. Usa-se let pois a variável pode ser sobreposta

        if  (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`); //Usando response para buscar dados e conectar a API do git hub pela URL
    
            const { name = login, avatar_url, bio } = apiResponse.data; //desestruturação buscando somente as variáveis desejadas das informações do response
        
            const techsArray = parseStringAsArray(techs); //quebra a String em um Array, separando por ","
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
    
            dev = await Dev.create({ //criando usuário no banco de dados --> creat, atraves da variável Dev, importada de outra classe
                github_username,//short sintaxe: parametro e valor são mesmo nome
                name,
                avatar_url,
                bio,
                techs: techsArray, //parametro diferente da variável, porque tivemos que quebrar a string em um vetor
                location,
            })
        }
    
        return response.json(dev); //retornando a variável "dev" que é uma instancia da classe Dev
    },

    async update() {

    },

    async destroy() {

    },
};