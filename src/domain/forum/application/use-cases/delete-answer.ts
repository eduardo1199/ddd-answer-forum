import { Either, left, right } from '@/core/either'
import { AnswerRepository } from '../repositories/answer-repository'
import { NotAllowError } from './errors/not-allow-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

type DeleteAnswerUseCaseResponse = Either<
  NotAllowError | ResourceNotFoundError,
  object
>

export class DeleteAnswerUseCase {
  constructor(private questionRepository: AnswerRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.questionRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowError())
    }

    await this.questionRepository.delete(answer)

    return right({})
  }
}
