import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from 'test/factories/make-answer-comments'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments List', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentRepository)
  })

  it('should be able fetch pagination answer comments', async () => {
    const AMOUNT_ANSWER = 3

    for (let i = 1; i <= AMOUNT_ANSWER; i++) {
      await inMemoryAnswerCommentRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.answerComments).toHaveLength(AMOUNT_ANSWER)
  })

  it('should be able fetch pagination answer comments', async () => {
    const AMOUNT_ANSWER = 22

    for (let i = 1; i <= AMOUNT_ANSWER; i++) {
      await inMemoryAnswerCommentRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.answerComments).toHaveLength(2)
  })
})
