
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

import request from 'supertest'
import { hash } from 'bcrypt'
import { Collection } from 'mongodb'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'any_name',
          email: 'any_email@email.com',
          password: 'any_password',
          confirmationPassword: 'any_password'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login success', async () => {
      const password = await hash('any_password', 12)
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@email.com',
        password
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'any_email@email.com',
          password: 'any_password'
        })
        .expect(200)
    })

    test('Should return 401 on login with invalid credentials', async () => {
      const password = await hash('any_password', 12)

      await request(app)
        .post('/api/login')
        .send({
          email: 'any_email@email.com',
          password
        })
        .expect(401)
    })
  })
})
