"use strict";

import { ModelRouter } from '../common/model-router';
import * as restify from 'restify';
import { User } from './users.model';

//Aqui sera inserido todas as rotas referente ao Usuario
class UsersRouter extends ModelRouter<User> {
    constructor() {
        super(User);

        //metodo para quando voltar o Objeto Usuario nao Aparecer sua senha
        this.on('beforeRender', document => {
            document.password = undefined
            // delete document.password
        })
    }

    findByEmail = (req, res, next) => {
        if (req.query.email) {
            User.findByEmail(req.query.email)
                .then(user => {
                    if (user) {
                        return [user];
                    } else {
                        return [];
                    }
                }) // pega o usuario encontrado e insere em um array
                .then(this.renderAll(res, next,{
                    pageSize:this.pageSize,
                    url:req.url
                }))
                .catch(next);
        } else
            next();
    };

    applyRoutes(application: restify.Server) {

        //pegar todo os Usuarios filtrando pelo email
        application.get({ path: `${this.basePath}`, version: '2.0.0' }, [this.findByEmail, this.findAll]);

        //pegar todo os Usuarios
        application.get({ path: `${this.basePath}`, version: '1.0.0' }, this.findAll);

        //pegar usuario pelo id
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);

        //Inserir novo Usuario
        application.post(`${this.basePath}`, this.save);

        //Atualizar um Usuario
        application.put(`${this.basePath}/:id`, [this.validateId, this.replace]);

        //Atualizar um Usuario parcialmente
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);

        //Exclusao um Usuario 
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete]);
    }
}
export const usersRouter = new UsersRouter();