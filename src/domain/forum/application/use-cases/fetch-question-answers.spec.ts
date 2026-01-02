import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repositorie'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repositorie'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswerRepository)
  })

  it('should be able fetch pagination recent questions', async () => {
    const AMOUNT_ANSWER = 3

    for (let i = 1; i <= AMOUNT_ANSWER; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({ questionId: new UniqueEntityID('question-1') }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.answers).toHaveLength(AMOUNT_ANSWER)
  })

  it('should be able fetch paginations recent questions', async () => {
    const AMOUNT_ANSWER = 22

    for (let i = 1; i <= AMOUNT_ANSWER; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({ questionId: new UniqueEntityID('question-1') }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
