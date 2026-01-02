import { QuestionRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowError } from './errors/not-allow-error'

interface DeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}

type DeleteQuestionUseCaseResponse = Either<
  NotAllowError | ResourceNotFoundError,
  object
>

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowError())
    }

    await this.questionRepository.delete(question)

    return right({})
  }
}
