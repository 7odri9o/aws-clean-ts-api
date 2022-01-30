import 'reflect-metadata'
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { SignUpController } from '../../presentation/controllers/signup/signup'

import { diContainer } from '../config/dependency-register'

const signUpController: SignUpController = diContainer.resolve('SignUpController')

export default (router: Router): void => {
  router.post('/signup', adaptRoute(signUpController))
}
