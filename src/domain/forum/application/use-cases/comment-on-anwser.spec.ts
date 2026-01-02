import { CommentAnswerUseCase } from './comment-on-anwser'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repositorie'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { makeQuestion } from 'test/factories/make-question'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswerRepository
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: CommentAnswerUseCase

describe('Create Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository()
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new CommentAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentRepository,
    )
  })

  it('should be able create a new comment answer', async () => {
    const answer = makeAnswer({})

    await inMemoryAnswersRepository.create(answer)

    const result = await sut.execute({
      content: 'Comentário teste',
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryAnswerCommentRepository.items[0].content).toEqual(
      'Comentário teste',
    )
  })
})
