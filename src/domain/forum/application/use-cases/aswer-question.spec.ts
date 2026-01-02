import { InMemoryAnswerRepository } from './../../../../../test/repositories/in-memory-answer-repositorie'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able create a new Answer', async () => {
    const result = await sut.execute({
      content: 'Nova  pergunta',
      instructorId: '1',
      questionId: '1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.items[0].id).toEqual(
      result?.value?.answer.id,
    )
  })
})
