import { Router } from 'express'

import authMiddleware from './app/middlewares/auth'

import RecipientController from './app/controllers/RecipientController'
import SessionController from './app/controllers/SessionController'

const routes = new Router()

routes.post('/session', SessionController.store)

routes.use(authMiddleware)

routes.get('/recipients', RecipientController.index)
routes.post('/recipients', RecipientController.store)
routes.put('/recipients/:id', RecipientController.update)

export default routes
