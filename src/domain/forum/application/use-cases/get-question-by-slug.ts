import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found.')
    }

    return {
      question,
    }
  }
}
