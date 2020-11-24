import { ModelRouter } from '../common/model-router';
import * as restify from 'restify';
import { NotFoundError } from 'restify-errors';
import { Restaurant } from './restaurants.model';

class RestaurantsRouter extends ModelRouter<Restaurant>{
    constructor() {
        super(Restaurant)
    }

    envelope(document) {
        let resource = super.envelope(document);
        resource._links.menu = `${this.basePath}/${resource._id}/menu`;
        return resource;
    }

    findMenu = (req, res: restify.Response, next) => {
        // Como paradrao o Menu nao vem no select  assim trara o Menu referente ao Restaurante em questão
        Restaurant.findById(req.params.id, "+menu")
            .then(rest => {
                if (!rest) {
                    throw new NotFoundError('Restaurant not found');
                } else {
                    res.json(rest.menu);
                    return next();
                }
            }).catch(next);
    };
    preplaceMenu = (req, res, next) => {
        Restaurant.findById(req.params.id)
            .then(rest => {
                if (!rest) {
                    throw new NotFoundError('Restaurant not found');
                } else {
                    rest.menu = req.body // Array de MenuItem
                    return rest.save();
                }
            }).then(rest => {
                res.json(rest.menu);
                return next();
            })
            .catch(next);
    }

    applyRoutes(application: restify.Server) {
        // Consultar Lista Restaurante
        application.get(`${this.basePath}`, this.findAll);
        // Consultar Um Restaurante 
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        // Salvar Um Novo Restaurante
        application.post(`${this.basePath}`, this.save);
        // Alterar Um Restaurante
        application.put(`${this.basePath}/:id`, [this.validateId, this.replace]);
        // Alterar Alguma Informação do Restaurante
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        // Deletar Um Restaurante
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete]);
        //Consulta Menu Restaurante
        application.get(`${this.basePath}/:id/menu`, [this.validateId, this.findMenu]);
        //Alterar um item no Menu do Restaurante
        application.put(`${this.basePath}/:id/menu`, [this.validateId, this.preplaceMenu])
    }
}

export const restaurantsRouter = new RestaurantsRouter();