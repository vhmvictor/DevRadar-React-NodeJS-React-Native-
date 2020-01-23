const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();  //Por padrão o express não interpreta JSON

mongoose.connect('mongodb://vhmvictor:Vhm131296@cluster0-shard-00-00-zp7kr.mongodb.net:27017,cluster0-shard-00-01-zp7kr.mongodb.net:27017,cluster0-shard-00-02-zp7kr.mongodb.net:27017/week10?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json()); // faz com que o express ententa o corpo no formato JSON (JAVA SCRIPT)
app.use(routes);
// Métodos HTTP: GET, POST, PUT, DELETE

//Tipos de parâmetro:
//Query Params: Usado geralmente com GET --> request.query (Filtros, ordenação, paginação, ...)
//Route Params: Usado geralmente com PUT e DELETE --> request.params (identificar um recurso na alteração ou remoção)
//Body: Usado geralemente com PUT e POST --> request.body (Dados para criação ou alteração de um registro)

//MongoDB (Não-relacional): Pode ser acessado na nuvem, não precisamente no PC(MongoDB-Atlas)

app.listen(3333);