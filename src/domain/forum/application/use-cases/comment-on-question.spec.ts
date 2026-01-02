import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repositorie'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comments-repository'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase

describe('Create Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentRepository,
    )
  })

  it('should be able create a new comment question', async () => {
    const question = makeQuestion({})

    await inMemoryQuestionsRepository.create(question)

    const result = await sut.execute({
      content: 'Comentário teste',
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual(
      'Comentário teste',
    )
  })
})
