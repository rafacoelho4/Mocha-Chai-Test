const express = require('express');
const connection = require('../database/connections');
const crypto = require('crypto');

module.exports = {
    async index (request, response) {
        try {
            const alunos = await connection('alunos').select('*');

            const [ count ] = await connection('alunos').count();

            response.header('X-Total-Count', count['count(*)']);

            return response.status(200).json(alunos);
        } catch (error) {
            return response.status(404).json(error);
        }
    },

    async show (request, response) {
        try {
            const { id } = request.params;

            const aluno = await connection('alunos').where('id', id).first();

            return response.status(200).json(aluno);
        } catch (error) {
            return response.status(404).json(error);
        }
    },

    async create (request, response) {
        try {
            const {
                name,
                email,
                password,
                major
            } = request.body;

            const requestImages = request.files;

            // console.log(requestImages);

            // const image = requestImages.map(image => {
            //     return { path: image.filename };
            // })

            const hash = crypto.randomBytes(4).toString("hex");

            await connection('alunos').insert({
                id: hash,
                name,
                email,
                password,
                // photo: image,
                major,
            });

            return response.status(201).json({ msg: "Criado com sucesso" });
        } catch (error) {
            console.log(error);
            return response.status(400).send(error);
        }
    },

    async destroy (request, response) {
        try {
            const { id } = request.params;

            await connection('alunos').where('id', id).delete();

            return response.status(204).send({msg: "Deletado com sucesso"});
        } catch (error) {
            return response.status(400).json(error);
        }
    }
}