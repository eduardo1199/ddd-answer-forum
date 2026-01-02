import { Either, left, right } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowError } from './errors/not-allow-error'

interface DeleteCommentAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

type DeleteCommentAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowError,
  object
>
export class DeleteCommentAnswerUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteCommentAnswerUseCaseRequest): Promise<DeleteCommentAnswerUseCaseResponse> {
    const answerComment = await this.answerCommentRepository.findById(answerId)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answerComment.authorId.toString()) {
      return left(new NotAllowError())
    }

    await this.answerCommentRepository.delete(answerComment)

    return right({})
  }
}
