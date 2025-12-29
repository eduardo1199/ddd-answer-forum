import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const filtered = this.items.filter((item) => item.id !== questionComment.id)

    this.items = filtered
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const findQuestionComment = this.items.find(
      (item) => item.id.toString() === id,
    )

    if (!findQuestionComment) {
      return null
    }

    return findQuestionComment
  }
}
