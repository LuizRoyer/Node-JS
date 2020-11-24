import { Review } from './reviews.model';
import { ModelRouter } from '../common/model-router';
import * as restify from 'restify';

class ReviewsRouter extends ModelRouter<Review>{
    constructor() {
        super(Review)
    }

    envelope(document) {
        let resource = super.envelope(document);
        let restId = document.restaurant._id ? document.restaurant._id : document.restaurant
        resource._links.restaurant = `/restaurants/${restId}`;
        return resource;
    }

    findById = (req, res, next) => {
        Review.findById(req.params.id)
            .populate('user', 'name')
            .populate('restaurant')
            .then(this.render(res, next))
            .catch(next);
    };

    applyRoutes(app: restify.Server) {
      
        app.get(`${this.basePath}`, this.findAll);
        app.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        app.post(`${this.basePath}`, this.save);
        app.del(`${this.basePath}/:id`, [this.validateId, this.delete]);
    }
}

export const reviewsRouter = new ReviewsRouter();