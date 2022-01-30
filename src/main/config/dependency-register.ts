import 'reflect-metadata'
import { container } from 'tsyringe'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'

container.register('EmailValidator', EmailValidatorAdapter)
container.register('AddAccount', DbAddAccount)
container.register('Encrypter', BcryptAdapter)
container.register('AddAccountRepository', AccountMongoRepository)

container.register('SignUpController', SignUpController)

export const diContainer = container
