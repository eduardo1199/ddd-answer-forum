import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repositorie'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowError } from './errors/not-allow-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able edit question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      title: 'pergunta teste',
      content: 'conteudo teste',
      questionId: newQuestion.id.toValue(),
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'pergunta teste',
      content: 'conteudo teste',
    })
  })

  it('should not be able to edit a question from user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      title: 'pergunta teste',
      content: 'conteudo teste',
      questionId: newQuestion.id.toValue(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowError)
  })
})
