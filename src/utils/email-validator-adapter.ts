import { EmailValidator } from '../presentation/protocols/email-validator'
import validator from 'validator'

import { injectable } from 'tsyringe'

@injectable()
export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
