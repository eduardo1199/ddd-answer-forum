import { AnswerRepository } from '../repositories/answer-repository'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/questions-repository'
import { Either, left, right } from '@/core/either'
import { NotAllowError } from './errors/not-allow-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ChooseBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

type ChooseBestAnswerUseCaseResponse = Either<
  NotAllowError | ResourceNotFoundError,
  {
    question: Question
  }
>

export class ChooseBestAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseBestAnswerUseCaseRequest): Promise<ChooseBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowError())
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return right({
      question,
    })
  }
}
