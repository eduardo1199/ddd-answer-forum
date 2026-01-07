import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachment-repository'
import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []

  constructor(private answerAttachmentRepository: AnswerAttachmentRepository) {}

  async create(answer: Answer) {
    this.items.push(answer)

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(answer: Answer): Promise<void> {
    const filtered = this.items.filter((item) => item.id !== answer.id)

    this.items = filtered
    this.answerAttachmentRepository.deleteManyByAnswerId(answer.id.toString())
  }

  async findById(id: string): Promise<Answer | null> {
    const findAnswer = this.items.find((answer) => answer.id.toString() === id)

    if (!findAnswer) {
      return null
    }

    return findAnswer
  }

  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[itemIndex] = answer

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((answer) => answer.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }
}
