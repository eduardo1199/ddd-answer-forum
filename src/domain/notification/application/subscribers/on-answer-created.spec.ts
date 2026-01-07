import { makeAnswer } from 'test/factories/make-answer'
import { OnAnswerCreated } from './on-answer-created'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repositorie'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repositorie'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-questions-attachments-repository'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification-repository'
import { makeQuestion } from 'test/factories/make-question'
import { SpyInstance } from 'vitest'
import { waitFor } from 'test/utils/wait-for'

let sendNotificationUseCase: SendNotificationUseCase
let inMemoryNotificationRepository: InMemoryNotificationRepository
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let inMemoryQuestionsAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryAnswersRepository: InMemoryAnswerRepository
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository

let sendNotificationExecuteSpy: SpyInstance

describe('On Answer Created Subscriber', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    inMemoryQuestionsAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentRepository,
    )
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswersRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentRepository,
    )
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    // eslint-disable-next-line no-new
    new OnAnswerCreated(inMemoryQuestionRepository, sendNotificationUseCase)
  })

  it('should send a notification when an answer is created', async () => {
    const question = makeQuestion({})
    const answer = makeAnswer({
      questionId: question.id,
    })

    inMemoryQuestionRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
