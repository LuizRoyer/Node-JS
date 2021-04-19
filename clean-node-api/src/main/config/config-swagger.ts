import { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'
import swaggerConfi from '@/main/docs'
import { noCache } from '@/main/middlewares/no-cache'

export default (app: Express): void => {
    app.use('/api-docs', noCache, serve, setup(swaggerConfi))
}
