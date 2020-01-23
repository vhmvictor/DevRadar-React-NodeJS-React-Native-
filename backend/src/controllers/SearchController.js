const Dev = require('../models/Dev'); //esse controller vai ter função de fazer um filtro dos devs que estão próximos e filtrar por tech selecionada.
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);
    
        const devs = await Dev.find({ //função para fazer filtro
            techs: {
                $in: techsArray, // $in: filtro(operador lógico para fazer busca dentro do mongo) para selecionar pelo menos um nome igual, se sim, retorna as infos do dev
            },
            location: {
                $near: { //operador para encontrar objetos perto de uma localização
                    $geometry: { //parametro do operador near, documentação do mongo
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000, //operador lógico para restringir distancia máxima para retornar consulta
                },
            },
        });

    return response.json({ devs });

    },
};