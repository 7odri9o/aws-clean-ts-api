import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { userAuth } from '@/main/middlewares/auth'
import { makeSaveSurveyResultController } from '@/main/factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory'

import { Router } from 'express'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', userAuth, adaptRoute(makeSaveSurveyResultController()))
}
