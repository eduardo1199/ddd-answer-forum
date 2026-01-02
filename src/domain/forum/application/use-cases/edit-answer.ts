import { Either, left, right } from './../../../../core/either'
import { AnswerRepository } from '../repositories/answer-repository'
import { Answer } from '../../enterprise/entities/answer'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowError } from './errors/not-allow-error'

interface EditAnswerUseCaseRequest {
  authorId: string
  content: string
  answerId: string
}

type EditAnswerUseCaseResponse = Either<
  NotAllowError | ResourceNotFoundError,
  { answer: Answer }
>

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowError())
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return right({ answer })
  }
}
