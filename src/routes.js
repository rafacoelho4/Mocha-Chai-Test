const express = require('express');
const multer = require('multer');

const AlunoController = require('./controllers/AlunoController');
const uploadConfig = require('./config/upload');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/alunos', AlunoController.index);
routes.get('/alunos/:id', AlunoController.show);
routes.post('/alunos', upload.single('photo'), AlunoController.create);
routes.delete('/alunos/:id', AlunoController.destroy);

module.exports = routes;