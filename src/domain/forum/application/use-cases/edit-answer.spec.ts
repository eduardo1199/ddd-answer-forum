import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repositorie'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { NotAllowError } from './errors/not-allow-error'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able edit question', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-1',
      content: 'conteudo teste',
      answerId: newAnswer.id.toString(),
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'conteudo teste',
    })
  })

  it('should not be able to edit a question from user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    inMemoryAnswerRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-2',
      content: 'conteudo teste',
      answerId: newAnswer.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowError)
  })
})
