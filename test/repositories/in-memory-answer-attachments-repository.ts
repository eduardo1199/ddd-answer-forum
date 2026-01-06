import { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachment-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentRepository
  implements AnswerAttachmentRepository
{
  public items: AnswerAttachment[] = []

  async create(answerAttachment: AnswerAttachment) {
    this.items.push(answerAttachment)
  }

  async findManyByAnswerId(questionId: string): Promise<AnswerAttachment[]> {
    const answerAttachments = this.items.filter(
      (answerAttachment) => answerAttachment.answerId.toString() === questionId,
    )

    return answerAttachments
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    const answerAttachments = this.items.filter(
      (answerAttachment) => answerAttachment.answerId.toString() !== answerId,
    )

    this.items = answerAttachments
  }
}
