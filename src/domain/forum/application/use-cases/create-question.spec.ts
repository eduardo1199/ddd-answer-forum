import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repositorie'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able create a new Question', async () => {
    const result = await sut.execute({
      content: 'Conteúdo da pergunta',
      authorId: '1',
      title: 'Nova pergunta',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(
      result.value?.question.id,
    )
  })
})
