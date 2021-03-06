import { handleError } from './error.handler';
import { mergePatchBodyParser } from './merge.patch.parser';
import { environment } from './../common/environment';
import * as restify from 'restify';
import { Router } from './../common/router';
import * as mongoose from 'mongoose';


export class Server {

    application: restify.Server;

    initializeDb() {
        (<any>mongoose).Promise = global.Promise;
        return mongoose
            .connect(environment.db.url);
    }

    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {

                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                });

                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                this.application.use(mergePatchBodyParser);


                this.application.get('/', this.myRouterDefault)
                //routes               
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }

                this.application.listen(environment.server.port, () => {
                    resolve(this.application);
                    console.log('Server is Running on port 3000');
                });

                this.application.on('restifyError', handleError);

            } catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.initializeDb().then(() => this.initRoutes(routers).then(() => this));
    }
    //fechar a conexao com o banco
    shutdown() {
        return mongoose.disconnect().then(() => this.application.close());
    };
    myRouterDefault = (req, res, next) => {
        res.json({
            _links: {
                review: '/reviews/',
                restaurant: '/restaurants/',
                user: '/users'
            }
        })
        return next();
    }
}