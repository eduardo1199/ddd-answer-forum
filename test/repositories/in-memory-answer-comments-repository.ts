import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const filtered = this.items.filter((item) => item.id !== answerComment.id)

    this.items = filtered
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const findAnswerComment = this.items.find(
      (item) => item.id.toString() === id,
    )

    if (!findAnswerComment) {
      return null
    }

    return findAnswerComment
  }
}
