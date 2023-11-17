import 'dotenv/config'

import Admcontroller from './src/Controller/AdmController.js';
import UserController from './src/Controller/UserController.js';



import express from 'express'
import cors from 'cors'

const server = express ();
server.use(cors());
server.use(express.json());
server.use('/storage/imagensprodutos', express.static('storage/imagensprodutos'))
server.use(Admcontroller);
server.use(UserController);



server.listen(process.env.PORT, ()=> console.log(`API Conectada na Porta ${process.env.PORT}`));
